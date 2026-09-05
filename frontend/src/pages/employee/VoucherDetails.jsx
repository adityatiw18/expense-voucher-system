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

                <p>
                    <strong>Voucher Number:</strong>{" "}
                    {voucher.voucher_number}
                </p>

                <p>
                    <strong>Voucher Date:</strong>{" "}
                    {voucher.voucher_date}
                </p>

                <p>
                    <strong>Expense Date:</strong>{" "}
                    {voucher.expense_date}
                </p>

                <p>
                    <strong>Department:</strong>{" "}
                    {voucher.department}
                </p>

                <p>
                    <strong>Expense Title:</strong>{" "}
                    {voucher.expense_title}
                </p>

                <p>
                    <strong>Category:</strong>{" "}
                    {voucher.expense_category}
                </p>

                <p>
                    <strong>Description:</strong>{" "}
                    {voucher.expense_description}
                </p>

                <p>
                    <strong>Amount:</strong>{" "}
                    ₹{voucher.amount}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    {voucher.status}
                </p>

                {voucher.rejection_reason && (
                    <p>
                        <strong>Rejection Reason:</strong>{" "}
                        {voucher.rejection_reason}
                    </p>
                )}

                {voucher.status === "DRAFT" && (
                    <div>
                        <button
                            onClick={() =>
                                navigate(`/employee/vouchers/${id}/edit`)
                            }
                        >
                            Edit
                        </button>

                        <button onClick={handleDelete}>
                            Delete
                        </button>

                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default VoucherDetails;