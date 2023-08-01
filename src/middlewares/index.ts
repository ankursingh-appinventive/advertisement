import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/userMod";
import bcrypt from "bcrypt";
//------------------------------------------ Signup API start------------------------------------------
export async function signup(req: Request, res: Response) {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exit please login" });
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });
  res.send("signup successfull");
}
//------------------------------------------ Signup API end------------------------------------------
//------------------------------------------ Login API start------------------------------------------
export async function login(req: Request, res: Response) {
  console.log("login called  ..................");
  const { username, password } = req.body;
  // const result = await sequelize.query("SELECT * FROM users");
  const user: any = await User.findOne({
    where: { username: username, password: password },
    raw: true,
  });
  console.log("=======================>\n\n", user);
  if (!user) {
    return res.status(404).send("User not found");
  }
  const email = user.email;
  const token = jwt.sign(email, "secret");
  res.send({ token });
}
//------------------------------------------ Login API ends------------------------------------------
////------------------------------------------ Get Profile API start------------------------------------------
export async function getProfile(req: Request, res: Response) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  try {
    if (!token) {
      return res.status(401).send("Authorization token not found");
    }
    const decodedToken = jwt.verify(token, "secret");
    console.log(decodedToken);
    const email = decodedToken;
    const user = await User.findOne({ where: { email: email } });
    console.log("user:", user);
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    console.log;
    return res.status(401).send("Invalid token");
  }
}
//------------------------------------------ Get Profile API end------------------------------------------
//------------------------------------------ Delete Profile API start------------------------------------------
export async function deleteUser(req: Request, res: Response) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  try {
    if (!token) {
      return res.status(401).send("Authorization token not found");
    }
    const decodedToken = jwt.verify(token, "secret");
    console.log(decodedToken);
    const email = decodedToken;
    const user = await User.findOne({ where: { email: email } });
    console.log("user:", user);
    if (!user) {
      return res.status(404).send("User not found");
    }
    await user.destroy();
    res.send("User delete successfully........");
  } catch (error) {
    console.log;
    return res.status(401).send("Invalid token");
  }
}
//------------------------------------------ Delete Profile API end------------------------------------------
////------------------------------------------ Update Profile API start------------------------------------------
export async function updateProfile(req: Request, res: Response) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  try {
    if (!token) {
      return res.status(401).send("Authorization token not found");
    }
    const decodedToken = jwt.verify(token, "secret") as string;
    console.log(decodedToken);
    const email = decodedToken;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Update the user's profile with the new data
    const { username, password } = req.body;
    if (username) {
      user.username = username;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 5);
      user.password = hashedPassword;
    }
    await user.save();
    res.send("Profile updated successfully");
  } catch (error) {
    console.log(error);
    return res.status(401).send("Invalid token");
  }
}
//------------------------------------------ Update Profile API end------------------------------------------
//
