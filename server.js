const fs = require("fs");
const express = require("express");
const app = express();

// midleware untuk membaca json dari req body ke kita
app.use(express.json());

//default URL
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success!",
    message: "Aplication is running...",
  });
});

const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/assets/data/cars.json`, "utf-8")
);
// /api/v1/collection
app.get("/api/v1/cars", (req, res) => {
  try {
    res.status(200).json({
      status: "Success!",
      message: "Success get cars data",
      totalData: cars.length,
      data: { cars },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed!",
      message: "failed get cars data..",
      isSuccess: false,
      data: null,
    });
  }
});

app.get("/rizal", (req, res) => {
  res.status(200).json({
    message: "Ping successfully!",
  });
  // if (app.get('/', (req, res) => {
  //     res.end("RAWR")
  // })) {

  // } else {
  //     console.log("err")
  // }
});

app.post("/api/v1/cars", (req, res) => {
  const newCar = req.body;

  cars.push(newCar);
  fs.writeFile(
    `${__dirname}/assets/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(201).json({
        status: "Success!",
        message: "Success get cars data",
        data: { car: newCar },
      });
    }
  );
});

app.use((req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "URL not exist",
  });
});

// middleware / handler untuk URL yang tidak dapat diakses
app.listen("3000", () => {
  console.log("Server berjalan di PORT 3000");
});
