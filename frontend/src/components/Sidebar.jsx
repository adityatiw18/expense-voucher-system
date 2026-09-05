import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
    const { user, logout } = useAuth();

    return (
        <aside>
            <h2>Expense System</h2>

            <p>Welcome, {user.name}</p>

            <nav>
                <Link to="/employee">Dashboard</Link>
                <Link to="/employee/vouchers">My Vouchers</Link>
                <Link to="/employee/create">Create Voucher</Link>
            </nav>

            <button onClick={logout}>Logout</button>
        </aside>
    );
}

export default Sidebar;