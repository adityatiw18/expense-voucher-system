import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div>
            <aside>
                <h2>Expense System</h2>

                <p>Welcome, {user.name}</p>

                <nav>
                    <Link to="/accounts">Dashboard</Link>
                    <Link to="/accounts/vouchers">All Vouchers</Link>
                </nav>

                <button onClick={logout}>Logout</button>
            </aside>

            <main>
                <h1>Accounts Dashboard</h1>

                <p>View and process expense vouchers.</p>

                <Link to="/accounts/vouchers">
                    <button>View All Vouchers</button>
                </Link>
            </main>
        </div>
    );
}

export default Dashboard;