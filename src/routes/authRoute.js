const express = require('express');
const userValidation = require("../controllers/user/user.validator");
const defaultController = require("../controllers/defaultController");
const { register, getUsers, login, logout } = require("../controllers/user/user.controller");

const router = express.Router();
 
router.get("/", defaultController);
router.post("/register", userValidation, register);
router.post("/login", userValidation, login);
router.post('/logout', logout);

router.get("/users", getUsers);

module.exports = router;