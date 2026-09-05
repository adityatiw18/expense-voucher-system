const pool = require("../config/database");

const createVoucher = async (voucher) => {
    const result = await pool.query(
        `INSERT INTO vouchers (
            voucher_number,
            voucher_date,
            expense_date,
            department,
            expense_title,
            expense_category,
            expense_description,
            amount,
            employee_id,
            employee_signature,
            document_path
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`,
        [
            voucher.voucherNumber,
            voucher.voucherDate,
            voucher.expenseDate,
            voucher.department,
            voucher.expenseTitle,
            voucher.expenseCategory,
            voucher.expenseDescription,
            voucher.amount,
            voucher.employeeId,
            voucher.employeeSignature,
            voucher.documentPath
        ]
    );

    return result.rows[0];
};

const findVoucherById = async (id) => {
    const result = await pool.query(
        `SELECT * FROM vouchers
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};
const findVouchersByEmployee = async (employeeId) => {
    const result = await pool.query(
        `SELECT * FROM vouchers
         WHERE employee_id = $1
         ORDER BY created_at DESC`,
        [employeeId]
    );

    return result.rows;
};

const updateVoucher = async (id, voucher) => {
    const result = await pool.query(
        `UPDATE vouchers
         SET voucher_date = $1,
             expense_date = $2,
             department = $3,
             expense_title = $4,
             expense_category = $5,
             expense_description = $6,
             amount = $7,
             employee_signature = $8,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $9
         RETURNING *`,
        [
            voucher.voucherDate,
            voucher.expenseDate,
            voucher.department,
            voucher.expenseTitle,
            voucher.expenseCategory,
            voucher.expenseDescription,
            voucher.amount,
            voucher.employeeSignature,
            id
        ]
    );

    return result.rows[0];
};

const deleteVoucher = async (id) => {
    const result = await pool.query(
        `DELETE FROM vouchers
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

const submitVoucher = async (id) => {
    const result = await pool.query(
        `UPDATE vouchers
         SET status = 'SUBMITTED',
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

const findAllVouchers = async () => {
    const result = await pool.query(
        `SELECT * FROM vouchers
         ORDER BY created_at DESC`
    );

    return result.rows;
};

const findPendingVouchers = async () => {
    const result = await pool.query(
        `SELECT * FROM vouchers
         WHERE status = 'SUBMITTED'
         ORDER BY created_at DESC`
    );

    return result.rows;
};

const approveVoucher = async (id, directorSignature) => {
    const result = await pool.query(
        `UPDATE vouchers
         SET status = 'APPROVED',
             director_signature = $1,
             approval_date = CURRENT_TIMESTAMP,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [directorSignature, id]
    );

    return result.rows[0];
};

const rejectVoucher = async (id, rejectionReason) => {
    const result = await pool.query(
        `UPDATE vouchers
         SET status = 'REJECTED',
             rejection_reason = $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [rejectionReason, id]
    );

    return result.rows[0];
};

module.exports = {
    createVoucher,
    findVoucherById,
    findVouchersByEmployee,
    updateVoucher,
    deleteVoucher,
    submitVoucher,
    findAllVouchers,
    findPendingVouchers,
    approveVoucher,
    rejectVoucher
};