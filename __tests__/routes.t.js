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
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual(
      "Add a latitude and longitude to the address bar to receive area weather. example: localhost:3000/30/94"
    );
  });
});

describe("API route", function () {
  test("responds to /:lat/:lon with object", async () => {
    const res = await request(app).get(`/${lat}/${lon}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(typeof JSON.parse(res.text)).toBe("object");
  });
});

describe("API route", function () {
  test("object contains condition value", async () => {
    const res = await request(app).get(`/${lat}/${lon}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text).condition).toBeTruthy();
  });
});

describe("API route", function () {
  test("object contains climate value", async () => {
    const res = await request(app).get(`/${lat}/${lon}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text).climate).toBeTruthy();
  });
});

describe("API route", function () {
  test("object contains alerts value", async () => {
    const res = await request(app).get(`/${lat}/${lon}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text).alerts).toBeTruthy();
  });
});

describe("API route", function () {
  test("climate is either hot, cold or moderate", async () => {
    const res = await request(app).get(`/${lat}/${lon}`);
    const climates = ["cold", "moderate", "hot"];
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(climates).toContain(JSON.parse(res.text).climate);
  });
});

describe("API route", function () {
  test("alert value contains array with event and description", async () => {
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

// describe("API route", function () {
//   test("responds to /:lat/:lon", async () => {
//     const res = await request(app).get("/45/-122");
//     const clim = ["hot", "cold", "moderate"];
//     expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
//     expect(res.statusCode).toBe(200);
//     expect(JSON.parse(res.text)).toEqual(
//       expect.objectContaining({
//         condition: expect.any(String),
//         climate: expect(clim).toContain(clim),
//         alerts: expect.arrayContaining([
//           {
//             event: expect.any(String),
//             description: expect.any(String),
//           },
//         ]),
//       })
//     );
//   });
// });
