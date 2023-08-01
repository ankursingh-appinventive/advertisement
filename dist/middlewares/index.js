"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.deleteUser = exports.getProfile = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMod_1 = __importDefault(require("../models/userMod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//------------------------------------------ Signup API start------------------------------------------
async function signup(req, res) {
    const { username, email, password } = req.body;
    const existingUser = await userMod_1.default.findOne({ where: { email: email } });
    if (existingUser) {
        return res.status(400).json({ message: "User already exit please login" });
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 5);
    const user = await userMod_1.default.create({
        username: username,
        email: email,
        password: hashedPassword,
    });
    res.send("signup successfull");
}
exports.signup = signup;
//------------------------------------------ Signup API end------------------------------------------
//------------------------------------------ Login API start------------------------------------------
async function login(req, res) {
    console.log("login called  ..................");
    const { username, password } = req.body;
    // const result = await sequelize.query("SELECT * FROM users");
    const user = await userMod_1.default.findOne({
        where: { username: username, password: password },
        raw: true,
    });
    console.log("=======================>\n\n", user);
    if (!user) {
        return res.status(404).send("User not found");
    }
    const email = user.email;
    const token = jsonwebtoken_1.default.sign(email, "secret");
    res.send({ token });
}
exports.login = login;
//------------------------------------------ Login API ends------------------------------------------
////------------------------------------------ Get Profile API start------------------------------------------
async function getProfile(req, res) {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, "secret");
        console.log(decodedToken);
        const email = decodedToken;
        const user = await userMod_1.default.findOne({ where: { email: email } });
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
//------------------------------------------ Get Profile API end------------------------------------------
//------------------------------------------ Delete Profile API start------------------------------------------
async function deleteUser(req, res) {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, "secret");
        console.log(decodedToken);
        const email = decodedToken;
        const user = await userMod_1.default.findOne({ where: { email: email } });
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
exports.deleteUser = deleteUser;
//------------------------------------------ Delete Profile API end------------------------------------------
////------------------------------------------ Update Profile API start------------------------------------------
async function updateProfile(req, res) {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
        if (!token) {
            return res.status(401).send("Authorization token not found");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, "secret");
        console.log(decodedToken);
        const email = decodedToken;
        const user = await userMod_1.default.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).send("User not found");
        }
        // Update the user's profile with the new data
        const { username, password } = req.body;
        if (username) {
            user.username = username;
        }
        if (password) {
            const hashedPassword = await bcrypt_1.default.hash(password, 5);
            user.password = hashedPassword;
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
//------------------------------------------ Update Profile API end------------------------------------------
//
//# sourceMappingURL=index.js.map