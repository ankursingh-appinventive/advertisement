"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteU = exports.logout = exports.updateAddress = exports.updateProfile = exports.address = exports.getProfile = exports.login = exports.signup = void 0;
const userMod_1 = __importDefault(require("../models/userMod"));
const sessionMod_1 = require("../models/sessionMod");
const addressMod_1 = require("../models/addressMod");
const bcrypt_1 = __importDefault(require("bcrypt"));
// import jwt from "jsonwebtoken";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.KEY;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// SIGNUP
async function signup(req, res) {
    //console.log(req.body);
    const { username, email, password, fav, DOB, phone_number, gender } = req.body;
    try {
        const exist = await userMod_1.default.findOne({ where: { email } });
        if (exist) {
            return res.status(400).json({ message: "user already exist" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const result = await userMod_1.default.create({
            username,
            email,
            password: hashedPassword,
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
}
exports.signup = signup;
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
        // const token = jwt.sign({ id: exists.id }, SECRET_KEY, {
        //   expiresIn: "1h",
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
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log(verifyToken);
        const id = verifyToken;
        const session = sessionMod_1.Session.findOne({ where: { id: id } });
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
        console.log("user:", user);
        if (!user) {
            return res.status(404).send("User not found");
        }
        else {
            res.send(user);
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
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log(verifyToken);
        const id = verifyToken;
        const user = await userMod_1.default.findOne({ where: { id: id } });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const { username, DOB, PIC, phone_number, fav } = req.body;
        if (username) {
            user.username = username;
        }
        if (DOB) {
            user.DOB = DOB;
        }
        if (phone_number) {
            user.phone_number = phone_number;
        }
        if (PIC) {
            const img = req.file.fieldname;
            user.profilePIC = new Blob([img], { type: 'plain/text' });
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
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log(verifyToken);
        const id = verifyToken;
        const user = await userMod_1.default.findOne({ where: { id: id } });
        console.log("user:", user);
        if (!user) {
            return res.status(404).send("User not found");
        }
        await user.destroy();
        res.send("User delete successfully........");
    }
    catch (error) {
        console.log;
        return res.status(401).send("Invalid token");
    }
}
exports.deleteU = deleteU;
// ADDRESS
async function address(req, res) {
    let id;
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log(verifyToken);
        id = verifyToken;
        const user = await userMod_1.default.findOne({ where: { id: id.id } });
        console.log("user:", user);
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
            user_Id: id.id,
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
    let address;
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log(verifyToken);
        const id = verifyToken;
        address = await addressMod_1.Address.findOne({ where: { id: id } });
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
//# sourceMappingURL=userCont.js.map