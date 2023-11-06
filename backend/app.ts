import { NextFunction, Request, Response } from "express";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const usersRoutes = require("./routes/user-routes");

const app = express();

app.use(bodyParser.json());

app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, newest, oldest"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/user", usersRoutes);

// app.use('/', (req : any, res: any , next : any) => {
//     res.json({message: "connected"})
// })

const connectUrl =
  "mongodb://admin:admin@ac-wibedy8-shard-00-00.cwlvidq.mongodb.net:27017,ac-wibedy8-shard-00-01.cwlvidq.mongodb.net:27017,ac-wibedy8-shard-00-02.cwlvidq.mongodb.net:27017/?ssl=true&replicaSet=atlas-biv403-shard-0&authSource=admin&retryWrites=true&w=majority";
const connectConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose
  .connect(connectUrl, connectConfig)
  .then(() => {
    console.log("+++ Database connected! +++");
    app.listen(5000);
  })
  .catch((err: any) => {
    console.log(err);
  });
