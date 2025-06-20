import { useEffect, useState } from "react";
import "./App.css";
import WeatherBlock from "./weatherBlock/WeatherBlock";
import WindowNowDay from "./windowNowDay/WindowNowDay";
import WindowNowTime from "./windowNowTime/WindowNowTime";
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

function App() {
  const [dataHourly, setDataHourly] = useState(null);
  const [dataDaily, setDataDaily] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const optionForDate = {
    hour: "2-digit",
    minute: "2-digit",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=57.6299&longitude=39.8737&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,wind_speed_10m_max&hourly=temperature_2m,precipitation_probability,apparent_temperature&timezone=Europe%2FMoscow&forecast_days=1"
        );
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setDataHourly(jsonData.hourly);
        setDataDaily(jsonData.daily);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const currentHourKey = dataHourly?.temperature_2m?.findIndex((_, key) => {
    const codeDate = new Date(dataHourly.time[key]);
    return new Date().getHours() === codeDate.getHours();
  });

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
    <>
      {error && <p>{error.message}</p>}
      {!loading ? (
        <div className="App">
          {dataHourly?.temperature_2m && (
            <WeatherBlock
              temp={dataHourly.temperature_2m}
              time={dataHourly.time}
              isTimeTrue={currentHourKey}
              optionForDate={optionForDate}
            />
          )}
          <div className="bottomWindow">
            <div className="leftBlock">
              <WindowNowDay
                optionForDate={optionForDate}
                dataDaily={dataDaily}
              />
              <WindowNowTime
                dataHourly={dataHourly}
                currentHourKey={currentHourKey}
              />
            </div>
            <div className="window lineDiagramm">
              <h4>Диаграмма температуры за 24 часа</h4>
              <Line data={data} options={options} />
            </div>
            <div className="window defWindow"></div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
