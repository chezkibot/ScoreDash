import React from "react";
import CircleText from "../components/CircleText";
import InputCourse from "../Forms/InputCourse";
import CoursesList from "../components/CoursesList";
import MyModal from "../components/MyModal";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import { useCoursesContext } from "../contexts/CoursesContext";

export default function CalcContainer() {
  const { calculateAvg, calcCredits, coursesList } = useCoursesContext();
  return (
    <>
      <div className="avg-credit-container ">
        <CircleText name="Average" value={calculateAvg(coursesList.courses)} />
        <CircleText name="Credits" value={calcCredits(coursesList.courses)} />
      </div>
      <Container>
        <Row>
          <MyModal
            popUpTitle={"Add course"}
            btnTitle="Add Course"
            btnClassName="btn"
            popUpBody={<InputCourse />}
          />
        </Row>
        <Row>
          <Col className="no-pad">
            <CoursesList />
          </Col>
        </Row>
      </Container>
    </>
  );
}
