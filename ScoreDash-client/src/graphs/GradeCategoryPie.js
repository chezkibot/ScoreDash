import React from "react";
import { PieChart, Pie, Cell, Tooltip, Text, Legend } from "recharts";
import Example from "../components/InfoButton";
import { useCoursesContext } from "../contexts/CoursesContext";

const dataToCategories = (data) => {
  const newData = {
    ranges: [
      {
        category: "95-100",
        name: [],
        value: 0,
      },
      {
        category: "90-94",
        name: [],
        value: 0,
      },
      {
        category: "85-89",
        name: [],
        value: 0,
      },
      {
        category: "80-84",
        name: [],
        value: 0,
      },
      {
        category: "75-79",
        name: [],
        value: 0,
      },
      {
        category: "70-74",
        name: [],
        value: 0,
      },
      {
        category: "65-69",
        name: [],
        value: 0,
      },
      {
        category: "60-64",
        name: [],
        value: 0,
      },
      {
        category: "55-59",
        name: [],
        value: 0,
      },
      {
        category: "FAIL",
        name: [],
        value: 0,
      },
    ],
  };

  for (const element of data.courses) {
    var i;
    if (element.grade >= 95) {
      i = 0;
    } else if (element.grade >= 90) {
      i = 1;
    } else if (element.grade >= 85) {
      i = 2;
    } else if (element.grade >= 80) {
      i = 3;
    } else if (element.grade >= 75) {
      i = 4;
    } else if (element.grade >= 70) {
      i = 5;
    } else if (element.grade >= 65) {
      i = 6;
    } else if (element.grade >= 60) {
      i = 7;
    } else if (element.grade >= 55) {
      i = 8;
    } else {
      i = 9;
    }
    newData.ranges[i].name.push(element.courseName);
    newData.ranges[i].value += element.credits;
  }

  for (const element of newData.ranges) {
    element.name = element.name.join(", ");
  }
  return newData.ranges.filter((item) => {
    return item.value > 0;
  });
};


const COLORS = [
  "#4ce600",
  "#3cb800 ",
  "#4A7C32",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#F088FE",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.65;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <Text
      x={x}
      y={y}
      width={100}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </Text>
  );
};

const formatFunc = (value, name, props) => {
  return [
    <div>
      <p>
        <b>Courses</b>: {name}
      </p>{" "}
      <p>
        <b>Credits</b>: {value}{" "}
      </p>
    </div>,
  ];
};
export default function GradeCategoryPie() {
  const { coursesList } = useCoursesContext();
  const data = coursesList;
  const categoryData = dataToCategories(data);

  return (
    <div className="pie-chart ">
      <Example
        infoText="Displays the number of credits (as percentage) per grade category. e.x - 39% of credits are graded between 91-95 and 61% are between 86-90.
"
      />
      <PieChart width={350} height={450}>
        <Pie
          data={categoryData}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={formatFunc} separator=" " align="center" />
        <Legend
          align="center"
          payload={categoryData.map((item, index) => ({
            type: "star",
            value: `${item.category} `,
            color: `${COLORS[index % COLORS.length]}`,
          }))}
        />
      </PieChart>
    </div>
  );
}
