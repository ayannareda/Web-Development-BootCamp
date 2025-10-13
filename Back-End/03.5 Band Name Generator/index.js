import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let bandName = "";

function bandNameGenerator(req, res, next) {
  bandName = req.body.street + req.body.pet;
  next();
}

app.use(bandNameGenerator);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
    res.send(`<h1>Your band name is:<h1> <h2>${bandName}</h2>`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});