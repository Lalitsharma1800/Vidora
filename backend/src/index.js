import express from "express";
import connectDB from "./db/dbConnection.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
