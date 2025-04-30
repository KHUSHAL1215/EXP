import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students")

  // Improved color generation with better contrast
  const generateRandomColors = (numColors) => {
    const colors = []
    const hueStep = 360 / numColors
    for (let i = 0; i < numColors; i++) {
      const hue = (i * hueStep) % 360
      const color = `hsl(${hue}, 70%, 60%)`
      colors.push(color)
    }
    return colors
  }

  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
        borderColor: "#1e293b", // slate-800
        borderWidth: 1,
      },
    ],
  }

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
        borderColor: "#1e293b", // slate-800
        borderWidth: 1,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#e2e8f0', // slate-200
          usePointStyle: true,
          padding: 15,
          font: {
            size: 14,
            family: "'Inter', sans-serif",
            weight: '500'
          },
          boxWidth: 12,
        }
      },
      tooltip: {
        bodyFont: {
          size: 14,
          family: "'Inter', sans-serif"
        },
        titleFont: {
          size: 16,
          family: "'Inter', sans-serif",
          weight: 'bold'
        },
        padding: 12,
        backgroundColor: '#1e293b', // slate-800
        titleColor: '#f8fafc', // slate-50
        bodyColor: '#e2e8f0', // slate-200
        cornerRadius: 8,
        displayColors: true,
        borderColor: '#334155', // slate-700
        borderWidth: 1
      }
    },
    layout: {
      padding: {
        right: 20 // Add space for longer labels
      }
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400 hover:text-yellow-200"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400 hover:text-yellow-200"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative h-[400px] w-full"> {/* Increased height */}
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
      <div className="text-sm text-richblack-200 mt-2">
        {currChart === "students" 
          ? "Number of students enrolled per course" 
          : "Income generated per course"}
      </div>
    </div>
  )
}
