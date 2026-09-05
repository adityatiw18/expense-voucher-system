import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function AllVouchers() {
    const { token } = useAuth();
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await api.get("/vouchers", {
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

        fetchVouchers();
    }, [token]);

    return (
        <div>
            <h1>All Vouchers</h1>

            <Link to="/accounts">
                <button>Back to Dashboard</button>
            </Link>

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
                        </tr>
                    </thead>

                    <tbody>
                        {vouchers.map((voucher) => (
                            <tr key={voucher.id}>
                                <td>{voucher.voucher_number}</td>
                                <td>{voucher.expense_title}</td>
                                <td>{voucher.department}</td>
                                <td>₹{voucher.amount}</td>
                                <td>{voucher.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AllVouchers;