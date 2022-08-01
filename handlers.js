const fetch = require("node-fetch");
const url = "https://api.openweathermap.org/data/3.0/onecall";
const appid = "2cc19a4838e6719d7f49f521a974aadb";

const initialResponse = (req, res) => {
  res.send(
    "Add a latitude and longitude to the address bar to receive area weather. example: localhost:3000/30/94"
  );
};

const apiRequest = async (req, res) => {
  const { lat, lon } = req.params;
  const response = await callApi(lat, lon);

  const data = await response.json();
  const { temp, weather } = data.current;
  const { alerts } = data;
  let climate = "";

  if (temp >= 80) {
    climate = "hot";
  } else if (temp <= 55) {
    climate = "cold";
  } else {
    climate = "moderate";
  }

  const display = {
    condition: weather[0].main,
    climate: climate,
    alerts: alerts
      ? [{ event: alerts[0].event, description: alerts[0].description }]
      : [{ event: "no alerts in this area", description: "no alerts" }],
  };

  res.send(display);
};

async function callApi(lat, lon) {
  const response = await fetch(
    url +
      `?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&units=imperial&appid=${appid}`
  );
  return response;
}

module.exports = { callApi, initialResponse, apiRequest };
