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

export const sessionCheck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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