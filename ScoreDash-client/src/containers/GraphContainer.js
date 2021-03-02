import React from "react";
import GradeCategoryPie from "../graphs/GradeCategoryPie";
import GradeGraph from "../graphs/GradeGraph";

export default function GraphContainer() {
  return (
    <div className="graphs-container">
      <GradeCategoryPie />
      <GradeGraph style={{ margin: "auto" }} />
    </div>
  );
}
