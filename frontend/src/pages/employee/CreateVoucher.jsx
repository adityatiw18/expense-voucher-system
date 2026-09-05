import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function CreateVoucher() {
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

    const [document, setDocument] = useState(null);

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
            const data = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            if (document) {
                data.append("document", document);
            }

            await api.post("/vouchers", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Voucher created successfully");

            navigate("/employee/vouchers");
        } catch (error) {
            console.error(
                "Failed to create voucher:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div>
            <h1>Create Voucher</h1>

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
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Expense Title</label>
                    <input
                        type="text"
                        name="expenseTitle"
                        value={formData.expenseTitle}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Expense Category</label>
                    <input
                        type="text"
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
                        type="text"
                        name="employeeSignature"
                        value={formData.employeeSignature}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Supporting Document</label>
                    <input
                        type="file"
                        onChange={(e) => setDocument(e.target.files[0])}
                    />
                </div>

                <button type="submit">
                    Save as Draft
                </button>

            </form>
        </div>
    );
}

export default CreateVoucher;