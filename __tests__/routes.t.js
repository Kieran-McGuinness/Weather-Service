const express = require("express");
const request = require("supertest");
const { initialResponse, apiRequest } = require("../handlers");
const lat = 30;
const lon = 40;

const app = new express();
app.get("/", initialResponse);
app.get("/:lat/:lon", apiRequest);

describe("Home route", function () {
  test("responds to /", async () => {
    const res = await request(app).get("/");
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8"); //expect simple text
    expect(res.statusCode).toBe(200); //should be a succesfull request
    expect(res.text).toEqual(
      "Add a latitude and longitude to the address bar to receive area weather. example: localhost:3000/30/94"
    );
  });
});

describe("API route", function () {
  test("responds to /:lat/:lon with object", async () => {
    const res = await request(app).get(`/${lat}/${lon}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8"); //expect json response from api
    expect(res.statusCode).toBe(200); //should be a succesful request
    expect(typeof JSON.parse(res.text)).toBe("object"); //converted json data should be an object
  });
});

describe("API route", function () {
  test("response object contains condition value", async () => {
    const res = await request(app).get(`/${lat}/${lon}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text).condition).toBeTruthy();
  });
});

describe("API route", function () {
  test("response object contains climate value", async () => {
    const res = await request(app).get(`/${lat}/${lon}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text).climate).toBeTruthy();
  });
});

describe("API route", function () {
  test("response object contains alerts value", async () => {
    const res = await request(app).get(`/${lat}/${lon}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text).alerts).toBeTruthy();
  });
});

describe("API route", function () {
  test("climate value is either hot, cold or moderate", async () => {
    const res = await request(app).get(`/${lat}/${lon}`);
    const climates = ["cold", "moderate", "hot"];
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(climates).toContain(JSON.parse(res.text).climate);
  });
});

describe("API route", function () {
  test("alert value contains array with both event and description", async () => {
    const res = await request(app).get(`/${lat}/${lon}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text).alerts).toEqual(
      expect.arrayContaining([
        {
          event: expect.any(String),
          description: expect.any(String),
        },
      ])
    );
  });
});
