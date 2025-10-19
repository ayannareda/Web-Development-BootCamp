import express from "express";

const app = express();
const PORT = 3000;

// Home Page
app.get("/", (req, res) => {
  const d = new Date();
  let day = d.getDay();
  if (day === 6 || day === 0) {
    // Saturday or Sunday
    res.render("index.ejs", {dayType : "weekend", advice : "relax!"});
  } else {
    // Weekday
    res.render("index.ejs", {dayType : "weekday", advice : "get to work!"});
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});