import express from "express";
import connectDB from "./db/dbConnection.js";

const app = express();

connectDB()
            .then(() => {
                app.listen(process.env.PORT, () => {
                    console.log(`listening to port: ${process.env.PORT}`);
                });
            })
            .catch((error) => {
                console.error(error);
            });



