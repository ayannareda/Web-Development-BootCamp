import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set Postgres creds
const DB_USER = "webdev";
const DB_HOST = "localhost";
const DB_NAME = "devdb";
const DB_PASSWORD = "password";
const DB_PORT = 5432; // default Postgres port

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  const pgClient = new pg.Client({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  try {
    await pgClient.connect();

    // Hash password using async/await
    const hash = await bcrypt.hash(password, saltRounds);

    // Insert into DB
    await pgClient.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hash]
    );

    res.send("Registration successful");

  } catch (err) {
    console.error("Caught an error:", err);
    res.status(500).send("Error registering user");
  } finally {
    await pgClient.end();
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  const pgClient = new pg.Client({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  try {
    await pgClient.connect();
    const storedHashPassword = await pgClient.query(
      "SELECT password FROM users WHERE email = $1",
      [email]
    );

    if (storedHashPassword.rows.length > 0) {
      const storedHash = storedHashPassword.rows[0].password;
      bcrypt.compare(password, storedHash, function (err, isMatch) {
        if (isMatch) {
          res.render("secrets.ejs");
        } else {
          res.status(401).send("Invalid credentials");
        }
      });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
