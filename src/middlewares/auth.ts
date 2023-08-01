import jwt, { JwtPayload } from "jsonwebtoken";
import { Session } from "../models/sessionMod";
import redisclient from "../redis/redis";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
const SEC_KEY = process.env.KEY || "ASDFGHJKL";

declare global {
  namespace Express {
    interface Request {
      userId?: any;
    }
  }
}

export const sessionCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
  }

  let ans: any;
  try {
    ans = jwt.verify(token, SEC_KEY);
  } catch (error) {
    res.send("Token expired or nat valid token");
    return;
  }
  try {
    const session = await Session.findOne({
      where: {
        user_id: ans.id,
        status: true,
      },
    });
    if (session) {
      console.log("Session Found");
      req.userId = ans.id;
      next();
    } else {
      console.log("Session Not Found");
      res.send("Authorization failed");
    }
  } catch (error) {
    res.send("error");
  }
};

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
