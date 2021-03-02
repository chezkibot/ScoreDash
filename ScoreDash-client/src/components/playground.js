import React, { useState } from "react";
import CircleText from "./CircleText";
import CourseRange from "./CourseRange";
import { Col, Table, Jumbotron } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import PopUp from "../components/MyModal";
import PlayGroundCourse from "../Forms/PlayGroundCourse";
import { useCoursesContext } from "../contexts/CoursesContext";
import { usePlayCoursesContext } from "../contexts/PlayCoursesContext";
const Playground = () => {
  const { calcCredits, calculateAvg, coursesList } = useCoursesContext();
  const { playCoursesList } = usePlayCoursesContext();

  return (
    <>
      <Jumbotron
        className="text-center shadow"
        style={{
          backgroundColor: "white",
        }}
      >
        <h5 style={{ color: "rgb(98 95 240)" }}>
          Playground will help you determine what grades you need to get on your
          ongoing courses in order to reach the average score you want. Enter
          the courses and credits and play around with the grades to see how it
          effects your final score.
        </h5>
      </Jumbotron>
      <div className="avg-credit-container ">
        <CircleText
          name="Average"
          value={calculateAvg([...playCoursesList, ...coursesList.courses])}
        />
        <CircleText
          name="Credits"
          value={calcCredits([...playCoursesList, ...coursesList.courses])}
        />
      </div>

      <Container>
        <Row>
          <PopUp
            popUpTitle={"Add course"}
            btnTitle="Add Course"
            btnClassName="btn"
            popUpBody={<PlayGroundCourse />}
          />
        </Row>
        <Row>
          <Col className="no-pad">
            <Table
              responsive="sm"
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
                  <th>Play with grade</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {playCoursesList.map((course, i) => (
                  <>
                    <CourseRange
                      courseName={course.courseName}
                      credits={course.credits}
                      _id={course._id}
                    />
                  </>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Playground;
