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
                    <Link to="/director">
                        Dashboard
                    </Link>

                    <Link to="/director/pending">
                        Pending Approvals
                    </Link>
                </nav>

                <button onClick={logout}>
                    Logout
                </button>
            </aside>

            <main>
                <h1>Director Dashboard</h1>

                <Link to="/director/pending">
                    <button>View Pending Approvals</button>
                </Link>
            </main>
        </div>
    );
}

export default Dashboard;