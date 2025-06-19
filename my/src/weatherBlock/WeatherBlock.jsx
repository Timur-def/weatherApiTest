import "./weatherBlock.css"
export default function WeatherBlock({ temp, time, isTimeTrue,setKeyNowHourWeather }) {
  return (
    <div className="windowWether">
      <h3>Прогноз на 24 часа</h3>
      <div className="weatherBlocks">
        {temp?.map((item, key) => {
          const codeDate = new Date(time[key]);
          isTimeTrue = new Date().getHours() === codeDate.getHours();
          return (
            <>
              <div className="block" key={key}>
                {isTimeTrue ? (
                  ((setKeyNowHourWeather(key)),
                  (
                    <span className="timeTitle" style={{ fontWeight: "600" }}>
                      Сейчас
                    </span>
                  ))
                ) : (
                  <p className="timeTitle">
                    {codeDate.toLocaleString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                )}
                <p>{Math.round(item)}°C</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

