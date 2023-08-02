// const bcrypt = require('bcrypt');
// const User = require('../models/user');
import bcrypt from 'bcrypt';
import User from '../models/userMod';


const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ where: { email } });
  } catch (error) {
    throw error;
  }
};

const makeuser = async (userData) => {
  const { username, email, password, fav, DOB, phone_number, gender } = userData;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({
      username,
      email,
      password: hashedPassword,
      fav,
      DOB,
      phone_number,
      gender,
    });
  } catch (error) {
    throw error;
  }
};

export default { findUserByEmail, makeuser };