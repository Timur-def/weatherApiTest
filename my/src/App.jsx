import { useEffect, useState } from "react";
import "./App.css";
import WeatherBlock from "./weatherBlock/WeatherBlock";
import WindowNowDay from "./windowNowDay/WindowNowDay";
import WindowNowTime from "./windowNowTime/WindowNowTime";
import WeatherDiagramm from "./weatherDiagramm/WeatherDiagramm";

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
            <WeatherDiagramm dataHourly={dataHourly} optionForDate={optionForDate}/>
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
