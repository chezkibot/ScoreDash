import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RiAddLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import "../styles/inputForm.css";
import { useCoursesContext } from "../contexts/CoursesContext";

export default function InputCourse() {
  const [courseName, setCourseName] = useState("");
  const [grade, setGrade] = useState(0);
  const [credits, setCredits] = useState(0);
  const { register, handleSubmit, errors } = useForm();
  const { addCourse } = useCoursesContext();

  const onSubmit = (data, e) => {
    console.log(data);
    if (courseName !== "" && grade !== 0 && credits !== null) {
      addCourse({
        key: uuidv4(),
        courseName: courseName,
        grade: parseInt(grade),
        credits: parseFloat(credits),
      });
      setCourseName("");
      setGrade(0);
      setCredits(0);
    }
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Course Name:</label>
      <input
        className="form-control"
        type="text"
        placeholder="e.g calculus"
        name="course_name"
        ref={register({ required: true, maxLength: 40 })}
        onChange={(e) => {
          setCourseName(e.target.value);
        }}
      />
      {errors.course_name && <p className="inputError">This is required</p>}
      <label>Credits:</label>
      <input
        type="number"
        step="0.5"
        placeholder="e.g. 3.5"
        className="form-control"
        name="course_credits"
        ref={register({ required: true })}
        min={0}
        onChange={(e) => {
          setCredits(e.target.value);
        }}
      />
      {errors.course_credits && <p className="inputError">This is required</p>}
      <label>Grade:</label>
      <input
        type="number"
        placeholder="e.g 94"
        name="course_grade"
        className="form-control"
        min={0}
        max={100}
        onChange={(e) => {
          setGrade(e.target.value);
        }}
        ref={register({ required: true })}
      />
      {errors.course_grade && (
        <span className="inputError">This is required</span>
      )}

      <div className="text-center mt-4">
        <button className="btn" type="submit">
          <RiAddLine />
        </button>
      </div>
    </form>
  );
}
