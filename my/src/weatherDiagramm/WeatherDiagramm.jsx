import "./WeatherDiagramm.css";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function WeatherDiagramm({dataHourly, optionForDate}) {
  const data = {
    labels: dataHourly?.time.map((item, _) =>
      new Date(item).toLocaleString("ru-RU", optionForDate)
    ),
    datasets: [
      {
        label: "",
        data: dataHourly?.temperature_2m.map((item, _) => Math.round(item)),
        fill: true,
        backgroundColor: "#f5f5f520",
        borderColor: "#f5f5f5",
        tension: 0.01,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
      },
    },
  };
  return (
    <div className="window lineDiagramm">
      <h4>Диаграмма температуры за 24 часа</h4>
      <Line data={data} options={options} />
    </div>
  );
}
