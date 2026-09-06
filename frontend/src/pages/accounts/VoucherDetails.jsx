import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

function VoucherDetails() {
    const { id } = useParams();
    const { token } = useAuth();

    const [voucher, setVoucher] = useState(null);

    useEffect(() => {
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

        fetchVoucher();
    }, [id, token]);

    const formatDate = (date) => {
        if (!date) return "-";

        const [year, month, day] = date
            .split("T")[0]
            .split("-");

        return `${day}-${month}-${year}`;
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
                                    {voucher.employee_signature ? (
                                        <img
                                            src={`http://localhost:5001/uploads/${voucher.employee_signature}`}
                                            alt="Employee signature"
                                            className="signature-image"
                                        />
                                    ) : (
                                        "-"
                                    )}
                                </td>
                            </tr>

                            <tr>
                                <th>Status</th>
                                <td>{voucher.status}</td>
                            </tr>

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

                            {voucher.document_path && (
                                <tr>
                                    <th>Supporting Document</th>
                                    <td>
                                        <img
                                            src={`http://localhost:5001/uploads/${voucher.document_path}`}
                                            alt="Supporting document"
                                            className="voucher-image"
                                        />
                                    </td>
                                </tr>
                            )}

                            {voucher.rejection_reason && (
                                <tr>
                                    <th>Rejection Reason</th>
                                    <td>{voucher.rejection_reason}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default VoucherDetails;