import React, { createContext, useEffect, useState, useContext } from "react";
const playCoursesContext = createContext();

const getPlayCourses = () => {
  const localData = localStorage.getItem("playCourses");
  return localData
    ? JSON.parse(localData)
    : [
        // {
        //   courseName: "therapy",
        //   credits: 4,
        //   grade: 99,
        //   _id: "6023212a8d317b3d8c77d268",
        // },
        // {
        //   courseName: "therapy",
        //   credits: 4,
        //   grade: 99,
        //   _id: "6023212a8d317b3d8c77d266",
        // },
      ];
};

const PlayCoursesProvider = (props) => {
  const [playCoursesList, setPlayCoursesList] = useState(getPlayCourses());

  const addPlayCourse = (course) => {
    setPlayCoursesList([...playCoursesList, course]);
  };

  const deletePlayCourse = (_id) => {
    console.log("id is: ", _id);
    const result = playCoursesList.filter((course) => course._id !== _id);
    setPlayCoursesList(result);
  };

  const PlayWithGrade = (_id, value) => {
    var newList = JSON.parse(JSON.stringify(playCoursesList));
    for (let i = 0; i < newList.length; i++) {
      if (newList[i]._id === _id) {
        newList[i].grade = value;
        setPlayCoursesList(newList);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("playCourses", JSON.stringify(playCoursesList));
  }, [playCoursesList]);

  const value = {
    addPlayCourse,
    playCoursesList,
    setPlayCoursesList,
    deletePlayCourse,
    PlayWithGrade,
  };

  return (
    <playCoursesContext.Provider value={value}>
      {props.children}
    </playCoursesContext.Provider>
  );
};

function usePlayCoursesContext() {
  return useContext(playCoursesContext);
}

export { usePlayCoursesContext, PlayCoursesProvider };
