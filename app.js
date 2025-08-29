import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";
import clubRouter from "./routes/clubRouter.js";
import adminRouter from "./routes/adminRouter.js";
import messageRouter from "./routes/messageRouter.js";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import {
  findUserById,
  findUsername,
  findUsersFromIds,
} from "./db/userQueries.js";
import connectPgSimple from "connect-pg-simple";
import pool from "./db/pool.js";
import flash from "connect-flash";
import { getMessages } from "./db/messageQueries.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const __dirname = import.meta.dirname;
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded());

app.use(
  session({
    store: new (connectPgSimple(session))({
      pool: pool,
    }),
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const rows = await findUsername(username);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Log in failed" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Log in failed" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const rows = await findUserById(id);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

async function getMessagesMiddleware(req, res, next) {
  const { user } = req;
  req.messages = [];

  if (user) {
    const messages = await getMessages();
    console.log(messages);
    const userIds = [];
    for (const message of messages) {
      if (!userIds.includes(message.user_id)) {
        userIds.push(message.user_id);
      }
    }
    console.log(userIds);
    const users = await findUsersFromIds(userIds);

    const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    for (const message of messages) {
      const messageObj = {};
      messageObj.title = message.title;
      messageObj.text = message.message;
      messageObj.date = dateTimeFormat.format(message.timestamp);
      const user = users.filter((value) => {
        return value.id === message.user_id;
      });
      messageObj.author = user[0].username;
      req.messages.push(messageObj);
    }
  }

  next();
}

// Base routes here
app.get("/", getMessagesMiddleware, (req, res) => {
  res.render("index", { user: req.user, messages: req.messages });
});

app.use("/sign-up", userRouter);
app.use("/club", clubRouter);
app.use("/new-message", messageRouter);
app.use("/admin", adminRouter);

// authentication
app.get("/login", (req, res) => {
  const errorMessage = req.flash("error");
  res.render("login", {
    message: errorMessage,
  });
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.use("/", (req, res) => {
  res.send("Not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
