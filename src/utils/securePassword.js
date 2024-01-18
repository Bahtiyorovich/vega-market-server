const bcrypt = require("bcrypt");

const securePassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 	salt);
    return hashedPassword;
};

const comparePassword = async (pass, value) => {
    const isPasswordValid = await bcrypt.compare(pass, value);
    return isPasswordValid;
}

module.exports = {securePassword, comparePassword};