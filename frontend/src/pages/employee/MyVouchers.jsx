import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

function MyVouchers() {
    const { token } = useAuth();

    const [vouchers, setVouchers] = useState([]);

    const fetchVouchers = async () => {
        try {
            const response = await api.get("/vouchers/my", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setVouchers(response.data.vouchers);
        } catch (error) {
            console.error(
                "Failed to fetch vouchers:",
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, [token]);

    return (
        <div>
            <Sidebar />

            <main>
                <h1>My Vouchers</h1>

                <Link to="/employee/create">
                    <button>Create Voucher</button>
                </Link>

                {vouchers.length === 0 ? (
                    <p>No vouchers found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Voucher No.</th>
                                <th>Expense</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {vouchers.map((voucher) => (
                                <tr key={voucher.id}>
                                    <td>{voucher.voucher_number}</td>
                                    <td>{voucher.expense_title}</td>
                                    <td>₹{voucher.amount}</td>
                                    <td>{voucher.status}</td>

                                    <td>
                                        <Link
                                            to={`/employee/vouchers/${voucher.id}`}
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    );
}

export default MyVouchers;