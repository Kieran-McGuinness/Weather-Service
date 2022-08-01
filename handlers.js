const fetch = require("node-fetch");
const url = "https://api.openweathermap.org/data/3.0/onecall"; //API url
const appid = process.env.API_KEY || ""; //api key goes here

// handler for the initial page without a lat/lon
const initialResponse = (req, res) => {
  res.send(
    "Add a latitude and longitude to the address bar to receive area weather. example: localhost:3000/30/94"
  );
  console.log(
    "Add a latitude and longitude to address bar and curl address to receive area weather. example: curl localhost:3000/30/94"
  );
};

// handler for the request to the Open Weather API, requires a lat and lon coordinate
const apiRequest = async (req, res) => {
  const { lat, lon } = req.params; //grabs the lat and lon coordinates from the request url
  const response = await callApi(lat, lon); // calls the callApi function with the lat and lon coordinates

  const data = await response.json(); //converts json response
  const { temp, weather } = data.current; // exptracts display information from the api response
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
    //puts the desired information together to be returned
    condition: weather[0].main,
    climate: climate,
    alerts: alerts
      ? [{ event: alerts[0].event, description: alerts[0].description }]
      : [{ event: "no alerts in this area", description: "no alerts" }],
  };

  res.send(display); //send the desired information
  console.log(display);
};

//function that sends the coordinates to the Open Weather API and returns the response back to the apiRequest handler
async function callApi(lat, lon) {
  const response = await fetch(
    url +
      `?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&units=imperial&appid=${appid}` //api url with some exclusions
  );
  return response;
}

module.exports = { callApi, initialResponse, apiRequest };
