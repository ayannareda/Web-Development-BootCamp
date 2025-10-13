import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    // Go to HomePage
    res.send("<h1>Home Page</h1>");
});

app.post("/register", (req, res) => {
    // Register the Data {insert}
    res.sendStatus(201);
});

app.put("/user/ayan", (req, res) => {
    // Update the Data {Delete + Insert}
    // Note: All entities have to passed in the body
    res.sendStatus(200);
});

app.patch("/user/ayan", (req, res) => {
    // Update the Data {update}
    // Note: Only the entities to be updated have to passed in the body
    res.sendStatus(200);
});

app.delete("/user/ayan", (req, res) => {
    // Delete the Data
    res.sendStatus(200);
});

app.listen(port, () => {
    // Start the server
    console.log(`Server is running on port ${port}`);
});