require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userModel = require("./models/userModel");
const authRoutes = require("./routes/authRoutes");
const pool = require("./config/database");
const bcrypt = require("bcrypt");
const app = express();
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");
const voucherRoutes = require("./routes/voucherRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "Server is running",
            databaseTime: result.rows[0].now
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/vouchers", voucherRoutes);

app.use(errorMiddleware);


const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});