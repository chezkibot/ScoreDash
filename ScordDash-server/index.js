require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const decodeIDToken = require("./authenticateToken");
const UserControllers = require("./controllers/userController");

const app = express();
const MongoUri = process.env.MONGO_URI;

mongoose
  .connect(MongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err.message);
  });

app.use(cors());
app.use(express.json());
app.use(decodeIDToken);

app.post("/api/users/create", UserControllers.createUser);
app.get("/api/user", UserControllers.getUser);

// adding/deleting courses
app.post("/api/users/courses/add", UserControllers.addCourse);
app.delete("/api/users/courses/delete", UserControllers.deleteCourse);

// adding/deleting playground courses
app.post("/api/users/playcourses/add", UserControllers.addPlayCourse);
app.delete("/api/users/playcourses/delete", UserControllers.deletePlayCourse);

app.get("/", (req, res) => {
  res.send("welcome to scoredash");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
