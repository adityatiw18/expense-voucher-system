import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

function PendingApprovals() {
    const { token } = useAuth();
    const [vouchers, setVouchers] = useState([]);
    const [search, setSearch] = useState("");

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

    const filteredVouchers = vouchers.filter((voucher) => {
        const searchTerm = search.toLowerCase();

        return (
            voucher.voucher_number.toLowerCase().includes(searchTerm) ||
            voucher.expense_title.toLowerCase().includes(searchTerm) ||
            voucher.department.toLowerCase().includes(searchTerm)
        );
    });

    return (
        <div>
            <Sidebar />

            <main>
                <h1>Pending Approvals</h1>

                <p>
                    Review expense vouchers submitted by employees.
                </p>

                <div style={{ maxWidth: "500px", margin: "25px 0" }}>
                    <label htmlFor="search">Search Vouchers</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search by voucher number, expense or department..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {vouchers.length === 0 ? (
                    <p>No pending vouchers.</p>
                ) : filteredVouchers.length === 0 ? (
                    <p>No vouchers match your search.</p>
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
                            {filteredVouchers.map((voucher) => (
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
            </main>
        </div>
    );
}

export default PendingApprovals;