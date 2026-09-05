import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function PendingApprovals() {
    const { token } = useAuth();
    const [vouchers, setVouchers] = useState([]);

    const fetchVouchers = async () => {
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

    useEffect(() => {
        fetchVouchers();
    }, [token]);

    return (
        <div>
            <h1>Pending Approvals</h1>

            {vouchers.length === 0 ? (
                <p>No pending vouchers.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Voucher No.</th>
                            <th>Expense</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {vouchers.map((voucher) => (
                            <tr key={voucher.id}>
                                <td>{voucher.voucher_number}</td>
                                <td>{voucher.expense_title}</td>
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
        </div>
    );
}

export default PendingApprovals;