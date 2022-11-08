"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const isAdminOrEditor_1 = __importDefault(require("../middleware/isAdminOrEditor"));
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const Programme_1 = __importDefault(require("../model/Programme"));
const error_response_1 = __importDefault(require("../response/error-response"));
const success_response_1 = __importDefault(require("../response/success-response"));
const router = express_1.default.Router();
const options = { runValidators: true, new: true, rawResult: true };
router.get("/", (req, res) => {
    Programme_1.default.find((err, programmes) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        if (programmes.length < 1) {
            return res
                .status(200)
                .json(new success_response_1.default("success", "no study programmes found"));
        }
        else {
            return res.status(200).json(new success_response_1.default("success", programmes));
        }
    });
});
router.post("/", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    const newProgramme = new Programme_1.default(req.body);
    newProgramme.save((err, programmeCreated) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res
            .status(201)
            .json(new success_response_1.default("created", programmeCreated));
    });
});
router.put("/:id", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Programme_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, new: true, rawResult: true }, (err, updatedProgramme) => {
        console.log(updatedProgramme);
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res
            .status(200)
            .json(new success_response_1.default("updated", updatedProgramme.value));
    });
});
router.delete("/:id", isAuthenticated_1.default, isAdmin_1.default, (req, res) => {
    Programme_1.default.findByIdAndDelete(req.params.id, (err, deletedProgramme) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res.status(204);
    });
});
router.post("/:id/osubject", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Programme_1.default.findById(req.params.id, (err, foundProgramme) => {
        var _a;
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        for (let i = 0; i < req.body.ids.length; i++) {
            (_a = foundProgramme === null || foundProgramme === void 0 ? void 0 : foundProgramme.osubjects) === null || _a === void 0 ? void 0 : _a.push(req.body.ids[i]);
        }
        foundProgramme.save((err, updatedProgramme) => {
            if (err) {
                return res.status(400).json(new error_response_1.default(err));
            }
            return res
                .status(200)
                .json(new success_response_1.default("updated", updatedProgramme));
        });
    });
});
router.post("/:id/ssubject", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Programme_1.default.findById(req.params.id, (err, foundProgramme) => {
        var _a;
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        for (let i = 0; i < req.body.ids.length; i++) {
            (_a = foundProgramme === null || foundProgramme === void 0 ? void 0 : foundProgramme.ssubjects) === null || _a === void 0 ? void 0 : _a.push(req.body.ids[i]);
        }
        foundProgramme.save((err, updatedProgramme) => {
            if (err) {
                return res.status(400).json(new error_response_1.default(err));
            }
            return res
                .status(200)
                .json(new success_response_1.default("updated", updatedProgramme));
        });
    });
});
router.post("/:id/ossubject", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Programme_1.default.findById(req.params.id, (err, foundProgramme) => {
        var _a;
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        for (let i = 0; i < req.body.ids.length; i++) {
            (_a = foundProgramme === null || foundProgramme === void 0 ? void 0 : foundProgramme.ossubjects) === null || _a === void 0 ? void 0 : _a.push(req.body.ids[i]);
        }
        foundProgramme.save((err, updatedProgramme) => {
            if (err) {
                return res.status(400).json(new error_response_1.default(err));
            }
            return res
                .status(200)
                .json(new success_response_1.default("updated", updatedProgramme));
        });
    });
});
router.delete("/:id/osubject", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Programme_1.default.findById(req.params.id, (err, foundProgramme) => {
        var _a;
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        for (let i = 0; i < req.body.ids.length; i++) {
            (_a = foundProgramme === null || foundProgramme === void 0 ? void 0 : foundProgramme.osubjects) === null || _a === void 0 ? void 0 : _a.push(req.body.ids[i]);
        }
        foundProgramme.save((err, updatedProgramme) => {
            if (err) {
                return res.status(400).json(new error_response_1.default(err));
            }
            return res
                .status(200)
                .json(new success_response_1.default("updated", updatedProgramme));
        });
    });
});
router.delete("/:id/ssubject", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Programme_1.default.findById(req.params.id, (err, foundProgramme) => {
        var _a;
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        for (let i = 0; i < req.body.ids.length; i++) {
            (_a = foundProgramme === null || foundProgramme === void 0 ? void 0 : foundProgramme.ssubjects) === null || _a === void 0 ? void 0 : _a.push(req.body.ids[i]);
        }
        foundProgramme.save((err, updatedProgramme) => {
            if (err) {
                return res.status(400).json(new error_response_1.default(err));
            }
            return res
                .status(200)
                .json(new success_response_1.default("updated", updatedProgramme));
        });
    });
});
router.delete("/:id/ossubject", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Programme_1.default.findById(req.params.id, (err, foundProgramme) => {
        var _a;
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        (_a = foundProgramme === null || foundProgramme === void 0 ? void 0 : foundProgramme.ossubjects) === null || _a === void 0 ? void 0 : _a.filter((item) => !req.body.ids.includes(item));
        foundProgramme.save((err, updatedProgramme) => {
            if (err) {
                return res.status(400).json(new error_response_1.default(err));
            }
            return res
                .status(200)
                .json(new success_response_1.default("updated", updatedProgramme));
        });
    });
});
exports.default = router;