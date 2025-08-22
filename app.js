import express from "express";
import 'dotenv/config';
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";
import clubRouter from "./routes/clubRouter.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const __dirname = import.meta.dirname;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());

// Base routes here
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/sign-up", userRouter);
app.use("/club", clubRouter);

app.use("/", (req, res) => {
  res.send("Not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));