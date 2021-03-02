import React from "react";
import { MdDelete } from "react-icons/md";
export default function Course(params) {
  const { courseName, grade, credits, _id } = params.course;
  return (
    <tr>
      <td>{courseName}</td>
      <td>{credits}</td>
      <td>{grade}</td>
      <td style={{ width: "10px" }}>
        <MdDelete
          style={{ cursor: "pointer" }}
          onClick={() => {
            console.log(_id);
            params.deleteCourse(_id);
          }}
        />
      </td>
    </tr>
  );
}
