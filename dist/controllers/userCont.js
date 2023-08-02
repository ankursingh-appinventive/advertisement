"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPassword = exports.uploadProfilePic = exports.deleteU = exports.logout = exports.updateAddress = exports.updateProfile = exports.address = exports.getProfile = exports.login = exports.signup = void 0;
// import { findUserByEmail, makeuser } from "../services/userSer";
const userSer_1 = __importDefault(require("../services/userSer"));
const userMod_1 = __importDefault(require("../models/userMod"));
const sessionMod_1 = require("../models/sessionMod");
const addressMod_1 = require("../models/addressMod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// import redisclient from '../redis/redis'
dotenv_1.default.config();
const SECRET_KEY = process.env.KEY;
// SIGNUP
// async function signup(req: Request, res: Response) {
//   //console.log(req.body);
//   const { username, email, password, fav, DOB, phone_number, gender } = req.body;
//   try {
//     const exist = await User.findOne({ where: { email } });
//     if (exist) {
//       return res.status(400).json({ message: "user already exist" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//       fav,
//       DOB,
//       phone_number,
//       gender,
//     });
//     res.status(201).json({ user: result });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "something went wrong" });
//   }
// }
// LOGIN
async function login(req, res) {
    const { email, password, device_Id } = req.body;
    try {
        const exists = await userMod_1.default.findOne({ where: { email } });
        if (!exists) {
            return res.status(404).json({ message: "User not found" });
        }
        const matchedPassword = await bcrypt_1.default.compare(password, exists.password);
        if (!matchedPassword) {
            return res.status(400).json({ message: "Password not match" });
        }
        const token = jsonwebtoken_1.default.sign({ id: exists.id }, SECRET_KEY, {
            expiresIn: process.env.EXP,
        });
        res.status(201).json({ user: exists, token: token });
        const result = await sessionMod_1.Session.create({
            user_id: exists.id,
            device_id: device_Id,
            status: true,
        });
        // await redisclient.set(`status:${result.id}`,'true');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.login = login;
// LOGOUT
async function logout(req, res) {
    const uid = req.userId;
    try {
        const session = sessionMod_1.Session.findOne({ where: { id: uid, status: true } });
        session.status = false;
        await session.save();
    }
    catch (error) {
        console.log(error);
        return res.status(401).send("Invalid token");
    }
}
exports.logout = logout;
// GET DETAILS
async function getProfile(req, res) {
    const uid = req.userId;
    try {
        const user = await userMod_1.default.findOne({ where: { id: uid } });
        // console.log("user:", user);
        if (!user) {
            return res.status(404).send("User not found");
        }
        else {
            res.send("user : " + user);
        }
    }
    catch (error) {
        console.log;
        return res.status(401).send("Invalid token");
    }
}
exports.getProfile = getProfile;
//UPDATE
async function updateProfile(req, res) {
    const uid = req.userId;
    try {
        const user = await userMod_1.default.findOne({ where: { id: uid } });
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
    }
    catch (error) {
        console.log(error);
        return res.status(401).send("Invalid token");
    }
}
exports.updateProfile = updateProfile;
//DELETE
async function deleteU(req, res) {
    const uid = req.userId;
    try {
        const user = await userMod_1.default.findOne({ where: { id: uid } });
        console.log("user:", user);
        if (!user) {
            return res.status(404).send("User not found");
        }
        await user.destroy();
        res.send("User deleted successfully........");
    }
    catch (error) {
        return res.status(401).send("Invalid token");
    }
}
exports.deleteU = deleteU;
// ADDRESS
async function address(req, res) {
    const uid = req.userId;
    try {
        const user = await userMod_1.default.findOne({ where: { id: uid } });
        // console.log("user:", user);
        if (!user) {
            return res.status(404).send("User not found");
        }
    }
    catch (error) {
        console.log;
        return res.status(401).send("Invalid token");
    }
    const { houseNo, street, area, landmark, district, city, state, country, zip, address_type, status } = req.body;
    try {
        const result = await addressMod_1.Address.create({
            user_Id: uid,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
}
exports.address = address;
// UPDATE ADDRESS
async function updateAddress(req, res) {
    const uid = req.userId;
    const aid = req.body;
    try {
        const address = await addressMod_1.Address.findOne({ where: { id: aid } });
        if (!address) {
            return res.status(404).send("Previous Address not found");
        }
        const { houseNo, street, area, landmark, district, city, state, country, zip, address_type } = req.body;
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
    }
    catch (error) {
        console.log;
        return res.status(401).send("Invalid token");
    }
}
exports.updateAddress = updateAddress;
async function uploadProfilePic(req, res) {
    const uid = req.userId;
    if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
    }
    const imagePath = "./public/uploads/" + req.file.originalname;
    const profilePic = await fs_1.default.readFileSync(path_1.default.resolve(imagePath));
    const user = await userMod_1.default.findOne({ where: { id: uid } });
    if (!user) {
        return res.status(400).json({ error: "No user Found" });
    }
    user.profilePIC = profilePic;
    await user.save();
    fs_1.default.unlink(path_1.default.resolve(imagePath), (err) => {
        console.log("error in file delete:", err);
    });
    return res
        .status(200)
        .json({ message: "Product Image updated successfully" });
}
exports.uploadProfilePic = uploadProfilePic;
async function forgetPassword(req, res) {
    const uid = req.userId;
    try {
        const { fav, newPassword } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        const user = await userMod_1.default.findOne({ where: { id: uid } });
        if (user.fav == fav) {
            user.password = hashedPassword;
            user.save();
            res.status(200).json({ message: "Password updated successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.forgetPassword = forgetPassword;
const signup = async (req, res) => {
    const { username, email, password, fav, DOB, phone_number, gender } = req.body;
    try {
        const exist = await userSer_1.default.findUserByEmail(email);
        if (exist) {
            return res.status(400).json({ message: "user already exists" });
        }
        const result = await userSer_1.default.makeuser({
            username,
            email,
            password,
            fav,
            DOB,
            phone_number,
            gender,
        });
        res.status(201).json({ user: result });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
};
exports.signup = signup;
//# sourceMappingURL=userCont.js.map