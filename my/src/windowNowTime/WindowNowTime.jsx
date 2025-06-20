import "./WindowNowTime.css";
export default function WindowNowTime({ dataHourly, currentHourKey }) {
  return (
    <div className="window windowNowTime">
      <h4>На данный момент</h4>
      <p>
        Ощущается:{" "}
        {dataHourly.apparent_temperature
          ? Math.round(dataHourly?.apparent_temperature[currentHourKey])
          : null}
        °C
      </p>
      <p>
        Возможность осадков:{" "}
        {dataHourly.precipitation_probability
          ? dataHourly?.precipitation_probability[currentHourKey]
          : null}
        %
      </p>
    </div>
  );
}
