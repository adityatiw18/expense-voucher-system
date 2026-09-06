import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

function VoucherDetails() {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [voucher, setVoucher] = useState(null);
    const formatDate = (date) => {
    if (!date) return "-";

    const [year, month, day] = date.split("T")[0].split("-");

    return `${day}-${month}-${year}`;
};
    const fetchVoucher = async () => {
        try {
            const response = await api.get(`/vouchers/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setVoucher(response.data.voucher);
        } catch (error) {
            console.error(
                "Failed to fetch voucher:",
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        fetchVoucher();
    }, [id, token]);

    const handleSubmit = async () => {
        try {
            await api.post(
                `/vouchers/${id}/submit`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Voucher submitted successfully");

            fetchVoucher();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to submit voucher"
            );
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this voucher?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/vouchers/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Voucher deleted successfully");

            navigate("/employee/vouchers");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete voucher"
            );
        }
    };

    if (!voucher) {
        return <p>Loading...</p>;
    }

    return (
    <div>
        <Sidebar />

        <main>
            <h1>Voucher Details</h1>

            <div className="details-card">
                <table className="details-table">
                    <tbody>
                        <tr>
                            <th>Voucher Number</th>
                            <td>{voucher.voucher_number}</td>
                        </tr>

                        <tr>
                            <th>Voucher Date</th>
                            <td>{formatDate(voucher.voucher_date)}</td>
                        </tr>

                        <tr>
                            <th>Expense Date</th>
                            <td>{formatDate(voucher.expense_date)}</td>
                        </tr>

                        <tr>
                            <th>Department</th>
                            <td>{voucher.department}</td>
                        </tr>

                        <tr>
                            <th>Expense Title</th>
                            <td>{voucher.expense_title}</td>
                        </tr>

                        <tr>
                            <th>Category</th>
                            <td>{voucher.expense_category || "-"}</td>
                        </tr>

                        <tr>
                            <th>Description</th>
                            <td>{voucher.expense_description || "-"}</td>
                        </tr>

                        <tr>
                            <th>Amount</th>
                            <td>₹{voucher.amount}</td>
                        </tr>

                        <tr>
                            <th>Employee Signature</th>
                            <td>{voucher.employee_signature || "-"}</td>
                        </tr>

                        <tr>
                            <th>Status</th>
                            <td>{voucher.status}</td>
                        </tr>

                        {voucher.rejection_reason && (
                            <tr>
                                <th>Rejection Reason</th>
                                <td>{voucher.rejection_reason}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {voucher.status === "DRAFT" && (
                    <div className="action-row">
                        <button
                            onClick={() =>
                                navigate(`/employee/vouchers/${id}/edit`)
                            }
                        >
                            Edit
                        </button>

                        <button
                            className="button-danger"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>

                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                )}
            </div>
        </main>
    </div>
);
}

export default VoucherDetails;