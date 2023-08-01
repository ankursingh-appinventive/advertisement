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
// // const jwt = require("jsonwebtoken");
// // import dotenv from 'dotenv';
// dotenv.config();
// const SECRET_KEY = "ASDFGHJKL";
// // import { Request, Response } from "express";
// // import Session from "../models/sessionModel";
// export const auth = (req:Request, res:Response, next:any) => {
//     try {
//         let token = req.headers.authorization;
//         if(token){
//             let token = req.headers.authorization;
//             if(token){
//                 token = token.split(" ")[1];
//                 let user = <JwtPayload>jwt.verify(token, SECRET_KEY);
//                 // console.log(user);
//                 req.userId = user.id;
//             }
//         }else{
//             res.status(401).json({message: "unauthorized user"});
//         }
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({message: "unauthorized user"});
//     }
// }
// // export default auth;
// // import jwt, { JwtPayload } from 'jsonwebtoken'
// // import {Session} from '../models/sessionMod'
// // const SEC_KEY: string = "ASDFGHJKL";
// // const auth = async (req:any, res:any, next:any) =>{
// //     try {
// //         let token = req.headers.authorization;
// //         let user:any
// //         if(token){
// //             token = token.split(" ")[1];
// //             user = <JwtPayload>jwt.verify(token, SEC_KEY);
// //             req.userId = user.id;
// //             // console.log("ksdhfk");
// //             // const verifyToken = jwt.verify(token, SEC_KEY)
// //             // const user = users.findOne({ _id: token._id, token})
// //         }else{
// //             res.status(401).json({message: "Unouthorized User"});
// //         }
// //         // let session = await Session.findOne({where:{user_ID:user.Id}})
// //         // if(!session){
// //         //     res.status(401).json({message: "You are loggedout"});
// //         // }else{
// //         //     next()
// //         // }
// //         next();
// //     } catch (error) {
// //         console.log(error)
// //         res.status(401).json({message: "Unouthorized User"});
// //     }
// // }
// // export {
// //     auth
// // }
//# sourceMappingURL=auth.js.map