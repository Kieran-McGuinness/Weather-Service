const express = require("express");
const app = express();
const { callApi, initialResponse, apiRequest } = require("./handlers");

// weather condition outside (snow, rain, etc)
// whether its hot, cold, moderate
// weather alert and what it is

app.get("/", initialResponse);
app.get("/:lat/:lon", apiRequest);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
