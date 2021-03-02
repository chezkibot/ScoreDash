import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Form } from "react-bootstrap";
import { usePlayCoursesContext } from "../contexts/PlayCoursesContext";

export default function CourseRange(props) {
  const [value, setValue] = useState(50);
  const { deletePlayCourse, PlayWithGrade } = usePlayCoursesContext();
  const { courseName, credits, _id } = props;

  return (
    <>
      <tr>
        <td>{courseName}</td>
        <td>{credits}</td>
        <td>{value}</td>
        <td>
          <Form.Control
            type="range"
            min={0}
            max={100}
            onChange={(e) => {
              setValue(e.target.value);
              PlayWithGrade(_id, e.target.value);
            }}
          />
        </td>
        <td>
          <MdDelete
            style={{ cursor: "pointer" }}
            onClick={() => {
              deletePlayCourse(_id);
            }}
          />
        </td>
      </tr>
    </>
  );
}
