import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
    const { token } = useAuth();
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        const fetchRecentVouchers = async () => {
            try {
                const response = await api.get("/vouchers", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setVouchers(response.data.vouchers);
            } catch (error) {
                console.error(
                    "Failed to fetch recent vouchers:",
                    error.response?.data || error.message
                );
            }
        };

        fetchRecentVouchers();
    }, [token]);

    return (
        <div>
            <Sidebar />

            <main>
                <h1>Accounts Dashboard</h1>

                <p>
                    View recently created and processed expense vouchers
                    and review their current status for reimbursement.
                </p>

                <h2 style={{ marginTop: "35px" }}>
                    Recent Vouchers
                </h2>

                <p>
                    The latest expense vouchers across the organization.
                </p>

                {vouchers.length === 0 ? (
                    <p>No vouchers found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Voucher No.</th>
                                <th>Expense</th>
                                <th>Department</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {vouchers.slice(0, 5).map((voucher) => (
                                <tr key={voucher.id}>
                                    <td>{voucher.voucher_number}</td>
                                    <td>{voucher.expense_title}</td>
                                    <td>{voucher.department}</td>
                                    <td>₹{voucher.amount}</td>
                                    <td>{voucher.status}</td>
                                    <td>
                                        <Link
                                            to={`/accounts/vouchers/${voucher.id}`}
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div style={{ marginTop: "28px" }}>
                    <Link to="/accounts/vouchers">
                        <button>View All Vouchers</button>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;