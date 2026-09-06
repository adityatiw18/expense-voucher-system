import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

function AllVouchers() {
    const { token } = useAuth();

    const [vouchers, setVouchers] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [departmentFilter, setDepartmentFilter] = useState("ALL");

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

    const departments = [
        ...new Set(vouchers.map((voucher) => voucher.department))
    ];

    const filteredVouchers = vouchers.filter((voucher) => {
        const searchTerm = search.toLowerCase();

        const matchesSearch =
            voucher.voucher_number.toLowerCase().includes(searchTerm) ||
            voucher.expense_title.toLowerCase().includes(searchTerm) ||
            voucher.department.toLowerCase().includes(searchTerm);

        const matchesStatus =
            statusFilter === "ALL" ||
            voucher.status === statusFilter;

        const matchesDepartment =
            departmentFilter === "ALL" ||
            voucher.department === departmentFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesDepartment
        );
    });

    return (
        <div>
            <Sidebar />

            <main>
                <h1>All Vouchers</h1>

                <p>
                    View all expense vouchers across the organization,
                    including their current approval status.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr",
                        gap: "15px",
                        margin: "25px 0"
                    }}
                >
                    <div>
                        <label>Search Vouchers</label>
                        <input
                            type="text"
                            placeholder="Search by voucher number, expense or department..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="DRAFT">Draft</option>
                            <option value="SUBMITTED">Submitted</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>

                    <div>
                        <label>Department</label>
                        <select
                            value={departmentFilter}
                            onChange={(e) =>
                                setDepartmentFilter(e.target.value)
                            }
                        >
                            <option value="ALL">All Departments</option>

                            {departments.map((department) => (
                                <option
                                    key={department}
                                    value={department}
                                >
                                    {department}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {filteredVouchers.length === 0 ? (
                    <p>No vouchers match your search or filters.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Voucher No.</th>
                                <th>Expense</th>
                                <th>Department</th>
                                <th>Amount</th>
                                <th>Status</th>
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
                                    <td>{voucher.status}</td>
                                    <td>
                                        <Link
                                            to={`/director/vouchers/${voucher.id}`}
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

export default AllVouchers;