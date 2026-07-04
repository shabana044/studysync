import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { loadSubjects } from "../../utils/storage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function AttendanceChart() {
  const subjects = loadSubjects();

  const data = {
    labels: subjects.map((subject) => subject.name),
    datasets: [
      {
        label: "Attendance %",
        data: subjects.map((subject) =>
          Math.round(
            (subject.attendedClasses / subject.totalClasses) * 100
          )
        ),
      },
    ],
  };

  return <Bar data={data} />;
}

export default AttendanceChart;