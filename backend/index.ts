import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
const FacebookStrategy = require("passport-facebook").Strategy;
import IUser from "./interface/user";

import dbConnect from "./utils/db-connect";
import authController from "./controller/auth-controller";
import programmeController from "./controller/programme-controller";
import subjectController from "./controller/subject-controller";
import userController from "./controller/user-controller";
import User from "./model/User";
import { CallbackError } from "mongoose";
import path from "path";
import logger from "./utils/logger";
import morganMiddleware from "./middleware/morgan";

dotenv.config();

passport.use(
  "facebook-auth",
  new FacebookStrategy(
    {
      clientID: process.env.FB_APP_ID || "",
      clientSecret: process.env.FB_APP_SECRET || "",
      callbackURL: "https://uusubjectman.com/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "email", "picture"],
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      User.findOne(
        { email: profile.emails[0].value },
        (err: CallbackError | undefined, foundUser: IUser | undefined) => {
          if (err) {
            done(null, false);
          }
          if (foundUser) {
            done(null, foundUser);
          } else {
            done(null, false);
          }
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(morganMiddleware);

const PORT = process.env.PORT || 8000;

dbConnect();

app.use("/api/auth", authController);
app.use("/api/programme", programmeController);
app.use("/api/subject", subjectController);
app.use("/api/user", userController);

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(PORT, () => {
  logger.info(`server started at port ${PORT}`);
});
