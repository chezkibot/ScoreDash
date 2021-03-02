import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import createToken from "../api/functions";
import { useAuth } from "./AuthContext";
const URL = "https://scoredash.herokuapp.com/api";

const UserCoursesContext = createContext();

function CoursesProvider(props) {
  const { user } = useAuth();
  const [coursesList, setCoursesList] = useState({
    courses: [],
    playCourses: [],
  });

  const [courseLoader, setCourseLoader] = useState(false);

  const apiAddRequest = async (target, course) => {
    setCourseLoader(true);
    const header = await createToken(user);
    console.log(header);
    await axios
      .post(target, course, header)
      .then(() => {
        getCourses().then((data) => {
          setCoursesList(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setCourseLoader(false);
  };

  const addCourse = async (course) => {
    apiAddRequest(URL + "/users/courses/add", course);
  };

  const addPlayCourse = async (course) => {
    apiAddRequest(URL + "/users/playcourses/add", course);
  };

  const apiDeleteRequest = async (target, _id) => {
    const header = await createToken(user);
    const config = {
      data: { _id: _id },
      headers: header.headers,
    };
    await axios
      .delete(target, config)
      .then(() => {
        getCourses().then((courses) => {
          setCoursesList(courses);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCourse = async (_id) => {
    apiDeleteRequest(URL + "/users/courses/delete", _id);
  };

  const deletePlayCourse = async (_id) => {
    apiDeleteRequest(URL + "/users/playcourses/delete", _id);
  };

  const calculateAvg = (courses) => {
    try {
      let sumCredits = calcCredits(courses);
      let sumGrades = 0;
      courses.map((course) => {
        sumGrades += parseInt(course.grade) * parseFloat(course.credits);
      });
      if (sumCredits > 0) return (sumGrades / sumCredits).toFixed(2);
      else return 0;
    } catch (err) {
      console.log(err);
    }
  };

  const calcCredits = (courses) => {
    try {
      let sumCredits = 0;
      courses.map((course) => {
        sumCredits += parseFloat(course.credits);
      });
      if (sumCredits) {
        return sumCredits;
      } else {
        return 0;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCourses = async () => {
    setCourseLoader(true);
    const header = await createToken(user);
    try {
      const res = await axios.get(URL + "/user", header);
      setCourseLoader(false);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  };

  const coursesData = {
    coursesList,
    setCoursesList,
    courseLoader,
    addCourse,
    deleteCourse,
    addPlayCourse,
    deletePlayCourse,
    setCoursesList,
    getCourses,
    calcCredits,
    calculateAvg,
  };

  useEffect(() => {
    // const unsubscribe = () => {
    try {
      if (user) {
        getCourses().then((data) => {
          data
            ? setCoursesList(data)
            : setCoursesList({ courses: [], playCourses: [] });
        });
      }
    } catch (err) {
      alert(err);
    }
    // };
    // return unsubscribe();
  }, [user]);

  return <UserCoursesContext.Provider value={coursesData} {...props} />;
}

function useCoursesContext() {
  return useContext(UserCoursesContext);
}

export { CoursesProvider, useCoursesContext };
