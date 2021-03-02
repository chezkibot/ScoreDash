const User = require("../models/User");

exports.createUser = (req, res) => {
  currentUser = req["currentUser"];
  const userObj = {
    uid: req["currentUser"].uid,
    courses: [],
  };
  const newUser = new User(userObj);
  newUser
    .save()
    .then((user) => {
      res.json({ msg: "newUser course successfully", user: user });
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Error has occured" });
    });
};

exports.getUser = async (req, res) => {
  currentUser = req["currentUser"];
  try {
    const userObj = await User.findOne({ uid: currentUser.uid });
    console.log(currentUser.uid);
    console.log("userObj is", userObj);
    res.status(200).json(userObj);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while geting the info",
    });
  }
};

exports.addCourse = async (req, res) => {
  currentUser = req["currentUser"];
  try {
    console.log(req.body);
    const userObj = await User.findOne({ uid: currentUser.uid });
    userObj.courses.unshift(req.body);
    userObj.save();
    res.status(200).json({ ...req.body, msg: "added successfuly" });
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};

exports.deleteCourse = async (req, res) => {
  currentUser = req["currentUser"];
  courseId = req.body._id;
  try {
    const userObj = await User.findOne({ uid: currentUser.uid });
    userObj.courses.pull(courseId);
    userObj.save();
    res.status(200).send(`course deleted`);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};

exports.addPlayCourse = async (req, res) => {
  currentUser = req["currentUser"];
  try {
    const userObj = await User.findOne({ uid: currentUser.uid });
    userObj.playCourses.unshift(req.body);
    userObj.save();
    res.status(200).json({ ...req.body, msg: "added successfuly" });
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};

exports.deletePlayCourse = async (req, res) => {
  currentUser = req["currentUser"];
  courseId = req.body._id;
  try {
    const userObj = await User.findOne({ uid: currentUser.uid });
    userObj.playCourses.pull(courseId);
    userObj.save();
    res.status(200).send(`course deleted`);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};

exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};
