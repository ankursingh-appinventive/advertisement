"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionCheck = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sessionMod_1 = require("../models/sessionMod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SEC_KEY = process.env.KEY || "ASDFGHJKL";
const sessionCheck = async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        token = token.split(" ")[1];
    }
    let ans;
    try {
        ans = jsonwebtoken_1.default.verify(token, SEC_KEY);
    }
    catch (error) {
        res.send("Token expired or nat valid token");
        return;
    }
    try {
        const session = await sessionMod_1.Session.findOne({
            where: {
                user_id: ans.id,
                status: true,
            },
        });
        if (session) {
            console.log("Session Found");
            req.userId = ans.id;
            next();
        }
        else {
            console.log("Session Not Found");
            res.send("Authorization failed");
        }
    }
    catch (error) {
        res.send("error");
    }
};
exports.sessionCheck = sessionCheck;
//# sourceMappingURL=auth.js.map