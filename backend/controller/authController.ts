import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User";
import { Model } from "mongoose";
import IUser from "../interface/user";
import validatePassword from "../utils/validate-password";

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
  const body = req.body;
  console.log(req.body);

  if (!validatePassword(body.password)) {
    return res.status(400).json({
      status: "error",
      errors: ["password did not meet minimum requirements"],
    });
  }

  if (!(body.username || body.password || body.role || body.name)) {
    res
      .status(400)
      .json({ status: "error", errors: ["uSome fields are missing"] });
  } else {
    User.findOne(
      { email: body.email },
      (err: Error | undefined, foundUser: IUser | undefined) => {
        if (foundUser) {
          res
            .status(400)
            .json({ status: "error", errors: ["username already exists"] });
        } else if (err) {
          res.status(400).json({ status: "error", errors: [err] });
        } else {
          bcrypt.hash(
            body.password,
            10,
            (err: Error | undefined, hash: string) => {
              if (err) res.status(400).json({ status: "error", errors: [err] });
              const user = new User<IUser>({
                email: body.email,
                name: body.name,
                password: hash,
                role: body.role,
              });
              user.save();
              res.status(200).json({ status: "user created", errors: [] });
            }
          );
        }
      }
    );
  }
});

router.post("/login", (req: Request, res: Response) => {
  const body = req.body;
  User.findOne(
    { email: body.email },
    (err: Error | undefined, foundUser: IUser | undefined) => {
      if (!foundUser) {
        res.status(400).json({
          status: "error",
          errors: ["username or password incorrect"],
        });
      } else if (err) {
        res.status(400).json({ status: "error", errors: [err] });
      } else {
        bcrypt.compare(
          body.password,
          foundUser.password,
          (err, result: boolean) => {
            if (err) {
              res.status(400).json({ status: "error", errors: [err] });
            } else if (!result) {
              res.status(400).json({
                status: "error",
                errors: ["username or password incorrect"],
              });
            } else {
              const payload = {
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
              };
              const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "7d",
              });
              res.status(200).json({ status: "logged in", errors: [], token });
            }
          }
        );
      }
    }
  );
});

export default router;
