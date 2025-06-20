import "./WindowNowDay.css";
export default function WindowNowDay({ dataDaily, optionForDate }) {
  return (
    <div className="window windowNowDay">
      <h4>
        Сегодня{" "}
        {new Date(dataDaily?.time[0]).toLocaleString("ru-RU", {
          day: "2-digit",
          month: "long",
        })}
      </h4>
      <p>Макс. скорость ветра: {dataDaily?.wind_speed_10m_max[0]} км/ч</p>
      <p>
        Макс. температура: {Math.round(dataDaily?.temperature_2m_max[0])} °C
      </p>
      <p>Мин. температура: {Math.round(dataDaily?.temperature_2m_min[0])} °C</p>
      <p>
        Восход:{" "}
        {new Date(dataDaily?.sunrise[0]).toLocaleString("ru-RU", optionForDate)}
      </p>
      <p>
        Закат:{" "}
        {new Date(dataDaily?.sunset[0]).toLocaleString("ru-RU", optionForDate)}
      </p>
    </div>
  );
}
