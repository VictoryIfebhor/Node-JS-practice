import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/index.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Connected");
});

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;

const start = async () => {
  try {
    console.log("connecting to DB...");
    await connectDB(mongoUri);
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
