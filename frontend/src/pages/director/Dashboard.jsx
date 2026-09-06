import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
    const { token } = useAuth();
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        const fetchPendingVouchers = async () => {
            try {
                const response = await api.get("/vouchers/pending", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setVouchers(response.data.vouchers);
            } catch (error) {
                console.error(
                    "Failed to fetch pending vouchers:",
                    error.response?.data || error.message
                );
            }
        };

        fetchPendingVouchers();
    }, [token]);

    return (
        <div>
            <Sidebar />

            <main>
                <h1>Director Dashboard</h1>

                <p>
                    Review expense vouchers submitted by employees,
                    approve valid claims, and reject vouchers that require
                    correction.
                </p>

                <h2 style={{ marginTop: "35px" }}>
                    Pending Approvals
                </h2>

                <p>
                    These vouchers are waiting for your review and approval.
                </p>

                {vouchers.length === 0 ? (
                    <p>No vouchers are currently pending approval.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Voucher No.</th>
                                <th>Expense</th>
                                <th>Department</th>
                                <th>Amount</th>
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
                                    <td>
                                        <Link
                                            to={`/director/vouchers/${voucher.id}`}
                                        >
                                            Review
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div style={{ marginTop: "28px" }}>
                    <Link to="/director/vouchers">
                        <button>View All Vouchers</button>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;