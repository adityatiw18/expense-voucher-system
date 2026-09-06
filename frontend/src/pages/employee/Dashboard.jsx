import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
import VoucherTable from "../../components/VoucherTable";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
    const [vouchers, setVouchers] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await api.get("/vouchers/my", {
                    headers: { Authorization: `Bearer ${token}` }
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

    const total = vouchers.length;
    const drafts = vouchers.filter(v => v.status === "DRAFT").length;
    const submitted = vouchers.filter(v => v.status === "SUBMITTED").length;
    const approved = vouchers.filter(v => v.status === "APPROVED").length;

    return (
        <div>
            <Sidebar />

            <main>
                <h1>Employee Dashboard</h1>

                <p className="dashboard-caption">
                    Create and manage your expense vouchers, track their status,
                    and submit them for approval.
                </p>

                <div className="dashboard-create">
                    <Link to="/employee/create">
                        <button>Create Voucher</button>
                    </Link>
                </div>

                <div className="stats-container">
                    <StatsCard title="Total Vouchers" value={total} />
                    <StatsCard title="Draft" value={drafts} />
                    <StatsCard title="Submitted" value={submitted} />
                    <StatsCard title="Approved" value={approved} />
                </div>

                <h2>Recent Vouchers</h2>

                {vouchers.length === 0 ? (
                    <p>No vouchers yet.</p>
                ) : (
                    <VoucherTable vouchers={vouchers.slice(0, 5)} />
                )}
            </main>
        </div>
    );
}

export default Dashboard;