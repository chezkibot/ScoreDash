import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { CoursesProvider } from "./contexts/CoursesContext";
import { AuthProvider } from "./contexts/AuthContext";
import { PlayCoursesProvider } from "./contexts/PlayCoursesContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CoursesProvider>
        <PlayCoursesProvider>
          <App />
        </PlayCoursesProvider>
      </CoursesProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
