import express from "express";
import 'dotenv/config';
import bodyParser from "body-parser";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const __dirname = import.meta.dirname;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());

// Base routes here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));