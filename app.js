const express = require("express");
const app = express();
const { initialResponse, apiRequest } = require("./handlers");

app.get("/", initialResponse); //initial page route
app.get("/:lat/:lon", apiRequest); // api route

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
