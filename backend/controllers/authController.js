const authService = require("../services/authService");
const { generateToken } = require("../utils/jwt");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authService.login(email, password);

        const token = generateToken(user);

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);

        res.status(401).json({
            message: error.message
        });
    }
};

module.exports = {
    login
};