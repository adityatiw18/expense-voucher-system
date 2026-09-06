import { useNavigate } from "react-router-dom";

function VoucherTable({ vouchers }) {
    const navigate = useNavigate();

    return (
        <table>
            <thead>
                <tr>
                    <th>Voucher No.</th>
                    <th>Expense</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                {vouchers.map((voucher) => (
                    <tr
                        key={voucher.id}
                        className="clickable-row"
                        onClick={() =>
                            navigate(`/employee/vouchers/${voucher.id}`)
                        }
                    >
                        <td>{voucher.voucher_number}</td>
                        <td>{voucher.expense_title}</td>
                        <td>₹{voucher.amount}</td>
                        <td>{voucher.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default VoucherTable;