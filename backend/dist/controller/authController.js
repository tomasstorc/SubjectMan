"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const validate_password_1 = __importDefault(require("../utils/validate-password"));
const error_response_1 = __importDefault(require("../response/error-response"));
const success_response_1 = __importDefault(require("../response/success-response"));
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const router = express_1.default.Router();
router.post("/register", isAuthenticated_1.default, isAdmin_1.default, (req, res) => {
    const body = req.body;
    if (!(0, validate_password_1.default)(body.password)) {
        return res
            .status(400)
            .json(new error_response_1.default("Password did not meet minimum requirements"));
    }
    if (!(body.username || body.password || body.role || body.name)) {
        res
            .status(400)
            .json(new error_response_1.default("Some required fields are missing"));
    }
    else {
        User_1.default.findOne({ email: body.email }, (err, foundUser) => {
            if (foundUser) {
                res
                    .status(400)
                    .json(new error_response_1.default("user with given email already exists"));
            }
            else if (err) {
                res.status(400).json(new error_response_1.default(err));
            }
            else {
                bcrypt_1.default.hash(body.password, 10, (err, hash) => {
                    if (err)
                        res.status(400).json(new error_response_1.default(err));
                    const user = new User_1.default({
                        email: body.email,
                        name: body.name,
                        password: hash,
                        role: body.role,
                    });
                    user.save((err, user) => {
                        if (err)
                            return res.status(400).json(new error_response_1.default(err));
                        return res.json(new success_response_1.default("User created"));
                    });
                });
            }
        });
    }
});
router.post("/login", (req, res) => {
    const body = req.body;
    User_1.default.findOne({ email: body.email }, (err, foundUser) => {
        if (!foundUser) {
            res.status(400).json({
                status: "error",
                errors: ["username or password incorrect"],
            });
        }
        else if (err) {
            res.status(400).json(new error_response_1.default(err));
        }
        else {
            bcrypt_1.default.compare(body.password, foundUser.password, (err, result) => {
                if (err) {
                    res.status(400).json(new error_response_1.default(err));
                }
                else if (!result) {
                    res
                        .status(400)
                        .json(new error_response_1.default("username or password incorrect"));
                }
                else {
                    const payload = {
                        name: foundUser.name,
                        email: foundUser.email,
                        role: foundUser.role,
                    };
                    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                        expiresIn: "7d",
                    });
                    res.status(200).json(new success_response_1.default("logged in", token));
                }
            });
        }
    });
});
exports.default = router;
