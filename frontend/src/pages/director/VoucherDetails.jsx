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
    const [signature, setSignature] = useState(null);
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

    const formatDate = (date) => {
        if (!date) return "-";

        const [year, month, day] = date
            .split("T")[0]
            .split("-");

        return `${day}-${month}-${year}`;
    };

    const handleApprove = async () => {
    if (!signature) {
        alert("Director signature image is required");
        return;
    }

    try {
        const data = new FormData();

        data.append("directorSignature", signature);

        await api.post(
            `/vouchers/${id}/approve`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Voucher approved successfully");
        navigate("/director/pending");
    } catch (error) {
        console.error(
            "Failed to approve voucher:",
            error.response?.data || error.message
        );

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
        return (
            <div>
                <Sidebar />

                <main>
                    <p>Loading...</p>
                </main>
            </div>
        );
    }

    return (
        <div>
            <Sidebar />

            <main>
                <h1>Review Voucher</h1>

                <div className="details-card">
                    <table className="details-table">
                        <tbody>
                            <tr>
                                <th>Voucher Number</th>
                                <td>{voucher.voucher_number}</td>
                            </tr>

                            <tr>
                                <th>Voucher Date</th>
                                <td>
                                    {formatDate(voucher.voucher_date)}
                                </td>
                            </tr>

                            <tr>
                                <th>Expense Date</th>
                                <td>
                                    {formatDate(voucher.expense_date)}
                                </td>
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
                                <td>
                                    {voucher.expense_category || "-"}
                                </td>
                            </tr>

                            <tr>
                                <th>Description</th>
                                <td>
                                    {voucher.expense_description || "-"}
                                </td>
                            </tr>

                            <tr>
                                <th>Amount</th>
                                <td>₹{voucher.amount}</td>
                            </tr>

                            <tr>
                                <th>Employee Signature</th>
                                <td>
                                    {voucher.employee_signature || "-"}
                                </td>
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

                            {voucher.director_signature && (
    <tr>
        <th>Director Signature</th>
        <td>
            <img
                src={`http://localhost:5001/uploads/${voucher.director_signature}`}
                alt="Director signature"
                className="signature-image"
            />
        </td>
    </tr>
)}
                        </tbody>
                    </table>

                    {voucher.status === "SUBMITTED" && (
                        <div className="approval-section">
                            <h2>Approve Voucher</h2>

                            <div>
                                <label>Director Signature</label>
                                <p className="input-help"> Upload your signature as a PNG or JPG image.</p>
                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg"
                                    onChange={(e) => setSignature(e.target.files[0])}
                                />
                            </div>

                            <div className="action-row">
                                <button onClick={handleApprove}>
                                    Approve
                                </button>
                            </div>

                            <h2>Reject Voucher</h2>

                            <div>
                                <label>Rejection Reason</label>

                                <textarea
                                    placeholder="Enter reason for rejection"
                                    value={rejectionReason}
                                    onChange={(e) =>
                                        setRejectionReason(e.target.value)
                                    }
                                />
                            </div>

                            <div className="action-row">
                                <button
                                    className="button-danger"
                                    onClick={handleReject}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default VoucherDetails;