import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

function customLogger(req, res, next) {
  console.log(`Custom Log -> ${req.method} ${req.url}`);
  next();
}

// Custom Middleware
app.use(customLogger);
// Logging Middleware {Morgan}
app.use(morgan("combined"));
// Pre-processing Middleware {Body-Parser}
app.use(bodyParser.urlencoded({ extended: true }));

// Pass static file for GET request
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Handle POST request
app.post("/submit", (req, res) => {
  // Using (.body) to print body content
  console.log(req.body);
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
