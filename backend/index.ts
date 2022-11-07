import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import dbConnect from "./utils/db-connect";
import authController from "./controller/auth-controller";
import programmeController from "./controller/programme-controller";

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

dbConnect();

app.use("/api/auth", authController);
app.use("/api/programme", programmeController);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
