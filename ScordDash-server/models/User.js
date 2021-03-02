const mongoose = require("mongoose");
const courseSchema = require("./Course");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  courses: [courseSchema],
  playCourses: [courseSchema],
});

module.exports = User = mongoose.model("user", userSchema);
