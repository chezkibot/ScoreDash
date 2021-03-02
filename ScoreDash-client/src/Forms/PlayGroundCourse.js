import React, { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import "../styles/inputForm.css";
import CoursesList from "../components/CoursesList";
import { usePlayCoursesContext } from "../contexts/PlayCoursesContext";
import { v4 as uuidv4 } from "uuid";

export default function InputPlayCourse() {
  const [courseName, setCourseName] = useState("");
  const [credits, setCredits] = useState(0);
  const { register, handleSubmit, errors } = useForm();
  const { addPlayCourse } = usePlayCoursesContext();

  const onSubmit = (data, i) => {
    console.log(data);
    addPlayCourse({
      courseName: courseName,
      credits: credits,
      grade: 50,
      _id: uuidv4(),
    });
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

      <div className="text-center mt-4">
        <button className="btn" type="submit">
          <RiAddLine />
        </button>
      </div>
    </form>
  );
}

// import React, { useState } from "react";
// import { RiAddLine } from "react-icons/ri";
// import { useForm } from "react-hook-form";
// import "../styles/inputForm.css";
// import CoursesList from "../components/CoursesList";

// export default function InputPlayCourse({ addPlayCourse, setPlayWithCourses }) {
//   const [courseName, setCourseName] = useState("");
//   const [credits, setCredits] = useState(0);
//   const { register, handleSubmit, errors } = useForm();

//   const onSubmit = (data, i) => {
//     console.log(data);
//     addPlayCourse({
//       courseName: courseName,
//       credits: credits,
//       grade: 50,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label>Course Name:</label>
//       <input
//         className="form-control"
//         type="text"
//         placeholder="e.g calculus"
//         name="course_name"
//         ref={register({ required: true, maxLength: 40 })}
//         onChange={(e) => {
//           setCourseName(e.target.value);
//         }}
//       />
//       {errors.course_name && <p className="inputError">This is required</p>}
//       <label>Credits:</label>
//       <input
//         type="number"
//         step="0.5"
//         placeholder="e.g. 3.5"
//         className="form-control"
//         name="course_credits"
//         ref={register({ required: true })}
//         min={0}
//         onChange={(e) => {
//           setCredits(e.target.value);
//         }}
//       />
//       {errors.course_credits && <p className="inputError">This is required</p>}

//       <div className="text-center mt-4">
//         <button className="btn" type="submit">
//           <RiAddLine />
//         </button>
//       </div>
//     </form>
//   );
// }
