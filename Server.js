const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./Routers/roomRouter");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/Rooms", router);

mongoose.connect("mongodb://localhost:27017/Hotel_DB").then(() => {
  console.log("Connected to DB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
