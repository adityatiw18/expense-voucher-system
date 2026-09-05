import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function VoucherDetails() {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [voucher, setVoucher] = useState(null);
    const [signature, setSignature] = useState("");
    const [rejectionReason, setRejectionReason] = useState("");

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

    const handleApprove = async () => {
        if (!signature.trim()) {
            alert("Director signature is required");
            return;
        }

        try {
            await api.post(
                `/vouchers/${id}/approve`,
                {
                    directorSignature: signature
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Voucher approved successfully");

            navigate("/director/pending");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to approve voucher"
            );
        }
    };

    const handleReject = async () => {
        if (!rejectionReason.trim()) {
            alert("Rejection reason is required");
            return;
        }

        try {
            await api.post(
                `/vouchers/${id}/reject`,
                {
                    rejectionReason: rejectionReason
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Voucher rejected successfully");

            navigate("/director/pending");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to reject voucher"
            );
        }
    };

    if (!voucher) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Review Voucher</h1>

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
                <strong>Employee Signature:</strong>{" "}
                {voucher.employee_signature}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                {voucher.status}
            </p>

            {voucher.status === "SUBMITTED" && (
                <div>
                    <hr />

                    <h2>Approve Voucher</h2>

                    <input
                        type="text"
                        placeholder="Director signature"
                        value={signature}
                        onChange={(e) =>
                            setSignature(e.target.value)
                        }
                    />

                    <button onClick={handleApprove}>
                        Approve
                    </button>

                    <hr />

                    <h2>Reject Voucher</h2>

                    <textarea
                        placeholder="Reason for rejection"
                        value={rejectionReason}
                        onChange={(e) =>
                            setRejectionReason(e.target.value)
                        }
                    />

                    <button onClick={handleReject}>
                        Reject
                    </button>
                </div>
            )}
        </div>
    );
}

export default VoucherDetails;