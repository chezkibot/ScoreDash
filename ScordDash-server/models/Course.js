const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: { type: String, require: true },
  credits: { type: Number, require: true },
  grade: { type: Number, require: true },
});

module.exports = Course = mongoose.model("Course", courseSchema);
module.exports = courseSchema;
