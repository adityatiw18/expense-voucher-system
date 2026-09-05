const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const login = async (email, password) => {
    const user = await userModel.findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

    return user;
};

module.exports = {
    login
};