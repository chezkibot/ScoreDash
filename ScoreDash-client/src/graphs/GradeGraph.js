import React, { useState } from "react";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useCoursesContext } from "../contexts/CoursesContext";
import _ from "lodash";
import "../styles/graphs.css";
import Dropdown from "react-bootstrap/Dropdown";
const COLORS = [
  "#4ce600	",
  "#40B008",
  "#2A7603",
  "#08B0B0",
  "#ffffbf",
  "#fdae61",
  "#d7191c",
];

export default function GradeGraph() {
  const { coursesList } = useCoursesContext();

  const sortAsce = () => {
    const sorted = _.cloneDeep(
      data.sort((a, b) => {
        return a.grade - b.grade;
      })
    );
    setData(sorted);
  };

  const sortDesc = () => {
    const sorted = _.cloneDeep(
      data.sort((a, b) => {
        return b.grade - a.grade;
      })
    );
    setData(sorted);
  };

  const [data, setData] = useState(_.cloneDeep(coursesList.courses));

  return (
    <>
      <div className="bar-graph">
        {/* <HiSortAscending onClick={sortAsce} />
        <HiSortDescending onClick={sortDesc} /> */}

        <Dropdown>
          <Dropdown.Toggle size="sm">Sort by grade</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={sortAsce}>Ascending</Dropdown.Item>
            <Dropdown.Item onClick={sortDesc}>Descending</Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setData(_.cloneDeep(coursesList.courses));
              }}
            >
              Original
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <BarChart width={700} height={450} data={data}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="courseName" />
          <YAxis
            dataKey="grade"
            ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          />
          <Tooltip />
          {/* <Legend /> */}

          <Bar dataKey="grade">
            {data.map((entry, index) => {
              const color =
                entry.grade >= 95
                  ? COLORS[0]
                  : entry.grade >= 90
                  ? COLORS[1]
                  : entry.grade >= 85
                  ? COLORS[2]
                  : entry.grade >= 80
                  ? COLORS[3]
                  : entry.grade >= 75
                  ? COLORS[4]
                  : COLORS[5];
              return <Cell fill={color} />;
            })}
          </Bar>
          <Bar dataKey="credits" fill="#116bb4" />
        </BarChart>
      </div>
    </>
  );
}
