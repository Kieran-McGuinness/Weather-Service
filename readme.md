Weather Service

An http server that takes in latitude/longitude coordinates and returns weather data from the Open Weather API for the given location. The weather data that is returned includes,
the current weather conditions outside in the area,
temperature as either hot (80°F+), moderate(79°F-56°F), or cold (55°F-),
and any weather alerts in the area and their description.

Technologies
Express 4.18.1
node-fetch 2
Jest 28.1.3
SuperTest 6.2.4

Launch
To run this project locally using npm:
$ npm install
$ npm start
The format for inputting the latitude and longitude coordinates is
http://localhost:3000/lat/lon
Example: http://localhost:3000/33/-94

The unit tests can be run with
$ npm test
