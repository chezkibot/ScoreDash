import React from "react";
import Course from "./Course";
import Table from "react-bootstrap/Table";
import { useCoursesContext } from "../contexts/CoursesContext";
import Spinner from "react-bootstrap/Spinner";

const CoursesList = () => {
  const { coursesList, deleteCourse, courseLoader } = useCoursesContext();

  return (
    <>
      <Table
        striped
        hover
        style={{
          boxShadow: "0 0 1em #BBBBBB",
          borderRadius: "4px",
          margin: "auto !important",
        }}
      >
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Credits</th>
            <th>Grade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coursesList.courses.map((course, i) => (
            <Course key={i} course={course} deleteCourse={deleteCourse} />
          ))}
        </tbody>
      </Table>
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        {courseLoader ? <Spinner animation="border" /> : null}
      </div>
    </>
  );
};

export default CoursesList;
