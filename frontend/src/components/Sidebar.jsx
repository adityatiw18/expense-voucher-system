import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const employeeLinks = [
        { label: "Dashboard", path: "/employee" },
        { label: "My Vouchers", path: "/employee/vouchers" },
        { label: "Create Voucher", path: "/employee/create" }
    ];

    const directorLinks = [
    { label: "Dashboard", path: "/director" },
    { label: "Pending Approvals", path: "/director/pending" },
    { label: "All Vouchers", path: "/director/vouchers" }
];

    const accountsLinks = [
        { label: "Dashboard", path: "/accounts" },
        { label: "All Vouchers", path: "/accounts/vouchers" }
    ];

    let links = [];

    if (user?.role === "EMPLOYEE") {
        links = employeeLinks;
    } else if (user?.role === "DIRECTOR") {
        links = directorLinks;
    } else if (user?.role === "ACCOUNTS") {
        links = accountsLinks;
    }

    return (
        <aside>
            <h2>Expense System</h2>

            <p>
                Welcome, {user?.name}
            </p>

            <p style={{ fontSize: "12px", opacity: 0.8 }}>
                {user?.role}
            </p>

            <nav>
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            <button onClick={handleLogout}>
                Logout
            </button>
        </aside>
    );
}

export default Sidebar;