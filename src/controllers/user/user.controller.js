const User = require("../../models/user.model");
const errorFunction = require("../../utils/errorFunction");
const {securePassword, comparePassword} = require("./../../utils/securePassword");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET_KEY || 'default_secret-key';

const register = async (req, res, next) => {
	try {
		const {name, username, email, password} = req.body;
		const existingUser = await User.findOne({ email }).lean(true);
		if (existingUser) {
			res.status(403);
			return res.json(errorFunction(true, "User Already Exists"));
			} else {
				const hashedPassword = await securePassword(password);
				const newUser = await User.create({
          name,
					username,
					email,
					password: hashedPassword,
			});
			if (newUser) {
				res.status(201);
				// Token generatsiya qilish
				const token = jwt.sign({ email }, jwtSecretKey);
			// Tokenni cookie ga yozish
				res.cookie('access_token', token, {
					httpOnly: true,
					secure: process.env.NODE_ENV !== 'production', // Faqatgina ishlab chiqarish paytida ishlatiladi
					maxAge:24 * 60 * 60 * 1000, // 1 kun
				});
				return res.json(
					errorFunction(false, "User Created", {newUser, token})
				);
			} else {
				res.status(403);
				return res.json(errorFunction(true, "Error Creating User"));
			}
		}
	} catch (error) {
		res.status(400);
		console.log(error);
		return res.json(errorFunction(true, "Error Adding user"));
	}
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ email }).lean(true);

    if (!existingUser) {
      res.status(401);
      return res.json(errorFunction(true, "Invalid credentials"));
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await comparePassword(password, existingUser.password);

    if (!passwordMatch) {
      res.status(401);
      return res.json(errorFunction(true, "Invalid credentials"));
    }

    // Generate and sign a new token
    const token = jwt.sign({ email }, jwtSecretKey);

    // Set the token in a cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'production',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200);
    return res.json(
      errorFunction(false, "Login successful", { user: existingUser, token })
    );
  } catch (error) {
    res.status(400);
    console.log(error);
    return res.json(errorFunction(true, "Error during login"));
  }
};

const logout = (req, res, next) => {
  try {
    // Clear the access_token cookie to log the user out
    res.clearCookie('access_token', { httpOnly: true, secure: process.env.NODE_ENV !== 'production' });

    res.status(200);
    return res.json(errorFunction(false, "Logout successful"));
  } catch (error) {
    res.status(500);
    console.log(error);
    return res.json(errorFunction(true, "Error during logout"));
  }
};


const getUsers = async (req, res, next) => {
	try {
		const allUsers = await User.find();
		if (allUsers) {
			res.status(201);
			return res.json(
				errorFunction(false, "Sending all users", allUsers)
			);
		} else {
			res.status(403);
			return res.json(errorFunction(true, "Error getting Users"));
		}
	} catch (error) {
		res.status(400);
		return res.json(errorFunction(true, "Error getting user"));
	}
};

module.exports = { register, login, logout, getUsers };