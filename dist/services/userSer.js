"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const bcrypt = require('bcrypt');
// const User = require('../models/user');
const bcrypt_1 = __importDefault(require("bcrypt"));
const userMod_1 = __importDefault(require("../models/userMod"));
const findUserByEmail = async (email) => {
    try {
        return await userMod_1.default.findOne({ where: { email } });
    }
    catch (error) {
        throw error;
    }
};
const makeuser = async (userData) => {
    const { username, email, password, fav, DOB, phone_number, gender } = userData;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        return await userMod_1.default.create({
            username,
            email,
            password: hashedPassword,
            fav,
            DOB,
            phone_number,
            gender,
        });
    }
    catch (error) {
        throw error;
    }
};
exports.default = { findUserByEmail, makeuser };
//# sourceMappingURL=userSer.js.map