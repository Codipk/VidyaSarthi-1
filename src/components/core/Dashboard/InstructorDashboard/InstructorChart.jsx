import React, { useState } from "react";

import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("students");
  console.log("Course : ", courses);
  //functio to genertae random colors
  const getRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )},
      ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  //create data for chart displaying student info

  const chartDataForStudents = {
    labels: courses?.map((course) => course?.courseName),
    datasets: [
      {
        data: courses?.map((course) => course?.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses?.length),
      },
    ],
  };

  //create data for chart displaying iincome info
  const chartDataForIncome = {
    labels: courses?.map((course) => course?.courseName),
    datasets: [
      {
        data: courses?.map((course) => course?.totalAmountGenerated),
        backgroundColor: getRandomColors(courses?.length),
      },
    ],
  };

  //create options
  const options = {};

  return (
    <div className=" flex-1 rounded-md bg-richblack-800  px-24 py-4">
      <p className="text-pink-100 font-extrabold text-2xl">Visualise</p>
      <div className="flex flex-row gap-5 py-3 text-xl ">
        <button onClick={() => setCurrChart("students")}>Student</button>
        <button onClick={() => setCurrChart("income")}>Income</button>
      </div>
      <div className=" flex-1 rounded-md bg-richblack-800 py-3 px-2">
        <Pie
          data={
            currChart === "students" ? chartDataForStudents : chartDataForIncome
          }
          options={options}
        />
      </div>
    </div>
  );
};

export default InstructorChart;
