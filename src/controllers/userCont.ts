import User from "../models/userMod";
import { Session } from "../models/sessionMod";
import { Address } from "../models/addressMod";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";
import fs from "fs"
// import redisclient from '../redis/redis'
dotenv.config();
const SECRET_KEY = process.env.KEY;

// SIGNUP
async function signup(req: Request, res: Response) {
  //console.log(req.body);
  const { username, email, password, fav, DOB, phone_number, gender } = req.body;
  try {
    const exist = await User.findOne({ where: { email } });
    if (exist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      username,
      email,
      password: hashedPassword,
      fav,
      DOB,
      phone_number,
      gender,
    });
    res.status(201).json({ user: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}

// LOGIN
async function login(req: Request, res: Response) {
  const { email, password, device_Id } = req.body;
  try {
    const exists = await User.findOne({ where: { email } });
    if (!exists) {
      return res.status(404).json({ message: "User not found" });
    }
    const matchedPassword = await bcrypt.compare(password, exists.password);
    if (!matchedPassword) {
      return res.status(400).json({ message: "Password not match" });
    }
      const token = jwt.sign({ id: exists.id }, SECRET_KEY, {
        expiresIn: process.env.EXP,
    });
    res.status(201).json({ user: exists, token: token });
    const result = await Session.create({
      user_id: exists.id,
      device_id: device_Id,
      status: true,
    });
    // await redisclient.set(`status:${result.id}`,'true');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// LOGOUT
async function logout(req: Request, res: Response) {
  const uid = req.userId
  try{
    const session = Session.findOne({ where: { id: uid, status: true } })
    session.status=false
    await session.save();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Invalid token");
    }
}

// GET DETAILS
async function getProfile(req: Request, res: Response) {
  const uid = req.userId
  try{
    const user = await User.findOne({ where: { id: uid } });
    // console.log("user:", user);
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      res.send("user : "+user);
    }
  } catch (error) {
    console.log;
    return res.status(401).send("Invalid token");
  }
}

//UPDATE
async function updateProfile(req: Request, res: Response) {
    const uid = req.userId
    try{
        const user = await User.findOne({ where: { id: uid } });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const { username, DOB, phone_number, fav } = req.body;
        if (username) {
            user.username = username;
        }
        if (DOB) {
            user.DOB = DOB;
        }
        if (phone_number) {
            user.phone_number = phone_number;
        }
        if (fav) {
            user.fav = fav;
        }
        await user.save();
          res.send("Profile updated successfully");
        } catch (error) {
          console.log(error);
          return res.status(401).send("Invalid token");
        }
}

//DELETE
async function deleteU(req: Request, res: Response) {
    const uid = req.userId
    try{
      const user = await User.findOne({ where: { id: uid } });
      console.log("user:", user);
      if (!user) {
        return res.status(404).send("User not found");
      }
      await user.destroy();
      res.send("User deleted successfully........");
    } catch (error) {
      return res.status(401).send("Invalid token");
    } 
  }

// ADDRESS
async function address(req: Request, res: Response) {
    const uid = req.userId
    try{
      const user = await User.findOne({ where: { id: uid } });
      // console.log("user:", user);
      if (!user) {
        return res.status(404).send("User not found");
      }
    } catch (error) {
        console.log;
        return res.status(401).send("Invalid token");
    } 
const {houseNo,street,area,landmark,district,city,state,country,zip,address_type,status} = req.body;
  try {
    const result = await Address.create({
        user_Id:uid,
        houseNo,
        street,
        area,
        landmark,
        district,
        city,
        state,
        country,
        zip,
        address_type,
        status
    });
    res.status(201).json({ user: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}

// UPDATE ADDRESS
async function updateAddress(req: Request, res: Response) {
    const uid = req.userId
    const aid = req.body
    try{
      const address = await Address.findOne({ where: { id: aid } });
      if (!address) {
        return res.status(404).send("Previous Address not found");
      }
const {houseNo,street,area,landmark,district,city,state,country,zip,address_type} = req.body;
    address.houseNo = houseNo;
    address.street = street;
    address.area = area;
    address.landmark = landmark;
    address.district = district;
    address.city = city;
    address.state = state;
    address.country = country;
    address.zip = zip;
    address.address_type = address_type;
    await address.save();
    res.send("Profile updated successfully");
    } catch (error) {
        console.log;
        return res.status(401).send("Invalid token");
    } 
}

async function uploadProfilePic(req:Request, res:Response){
  const uid = req.userId
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }
  const imagePath = "./public/uploads/" + req.file.originalname;
  const profilePic = fs.readFileSync(path.resolve(imagePath));
  const user:any = await User.findOne({ where: { user_id : uid } });
  if (!user) {
    return res.status(400).json({ error: "No user Found" });
  }
  user.profilePIC = profilePic
  await user.save();
  fs.unlink(path.resolve(imagePath), (err) => {
    console.log("error in file delete:", err);
  });
  return res
    .status(200)
    .json({ message: "Product Image updated successfully" });
}

async function forgetPassword(req:Request, res:Response){
  const uid = req.userId
  try {
    const {fav, newPassword} = req.body
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const user = await User.findOne({where:{id:uid}})
  if(user.fav==fav){
        user.password=hashedPassword
        user.save();
        res.status(200).json({message:"Password updated successfully"})
  }
  } catch (error) {
    res.status(500).json({message: "Something went wrong"});
  }
}

export {
  signup,
  login,
  getProfile,
  address,
  updateProfile,
  updateAddress,
  logout,
  deleteU,
  uploadProfilePic,
  forgetPassword
};
