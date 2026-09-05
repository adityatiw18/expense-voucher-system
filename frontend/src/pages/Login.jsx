import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            login(response.data.user, response.data.token);
            if (response.data.user.role === "EMPLOYEE") {
    navigate("/employee");
} else if (response.data.user.role === "DIRECTOR") {
    navigate("/director");
} else if (response.data.user.role === "ACCOUNTS") {
    navigate("/accounts");
}
            console.log("Login successful");
        } catch (error) {
            console.error(
                "Login failed:",
                error.response?.data || error.message
            );
        }
    };

    return (
    <div className="login-page">
        <div className="login-card">
            <h1>Expense Voucher System</h1>
            <p>Sign in to manage your expense vouchers</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    </div>
);
}

export default Login;