import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

function EditVoucher() {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        voucherDate: "",
        expenseDate: "",
        department: "",
        expenseTitle: "",
        expenseCategory: "",
        expenseDescription: "",
        amount: "",
        employeeSignature: ""
    });

    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const response = await api.get(`/vouchers/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const voucher = response.data.voucher;

                setFormData({
                    voucherDate: voucher.voucher_date,
                    expenseDate: voucher.expense_date,
                    department: voucher.department,
                    expenseTitle: voucher.expense_title,
                    expenseCategory: voucher.expense_category || "",
                    expenseDescription: voucher.expense_description || "",
                    amount: voucher.amount,
                    employeeSignature: voucher.employee_signature || ""
                });
            } catch (error) {
                console.error(
                    "Failed to fetch voucher:",
                    error.response?.data || error.message
                );
            }
        };

        fetchVoucher();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/vouchers/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Voucher updated successfully");

            navigate(`/employee/vouchers/${id}`);
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update voucher"
            );
        }
    };

    return (
    <div>
        <Sidebar />

        <main>
            <h1>Edit Voucher</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Voucher Date</label>
                    <input
                        type="date"
                        name="voucherDate"
                        value={formData.voucherDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Expense Date</label>
                    <input
                        type="date"
                        name="expenseDate"
                        value={formData.expenseDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Department</label>
                    <input
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Expense Title</label>
                    <input
                        name="expenseTitle"
                        value={formData.expenseTitle}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Expense Category</label>
                    <input
                        name="expenseCategory"
                        value={formData.expenseCategory}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        name="expenseDescription"
                        value={formData.expenseDescription}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div>
                    <label>Employee Signature</label>
                    <input
                        name="employeeSignature"
                        value={formData.employeeSignature}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">
                    Save Changes
                </button>

            </form>
        </main>
    </div>
);
}

export default EditVoucher;