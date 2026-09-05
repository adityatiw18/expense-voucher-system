const voucherModel = require("../models/voucherModel");
const { generateVoucherNumber } = require("../utils/voucherNumber");

const createVoucher = async (voucherData, employeeId) => {
    const voucher = {
        ...voucherData,
        voucherNumber: generateVoucherNumber(),
        employeeId
    };

    return await voucherModel.createVoucher(voucher);
};

const getVoucherById = async (id, userId, role) => {
    const voucher = await voucherModel.findVoucherById(id);

    if (!voucher) {
        throw new Error("Voucher not found");
    }

    if (role === "EMPLOYEE" && voucher.employee_id !== userId) {
        throw new Error("Access denied");
    }

    return voucher;
};
const getMyVouchers = async (employeeId) => {
    return await voucherModel.findVouchersByEmployee(employeeId);
};

const updateVoucher = async (id, employeeId, voucherData) => {
    const voucher = await voucherModel.findVoucherById(id);

    if (!voucher) {
        throw new Error("Voucher not found");
    }

    if (voucher.employee_id !== employeeId) {
        throw new Error("Access denied");
    }

    if (voucher.status !== "DRAFT") {
        throw new Error("Only draft vouchers can be edited");
    }

    return await voucherModel.updateVoucher(id, voucherData);
};

const deleteVoucher = async (id, employeeId) => {
    const voucher = await voucherModel.findVoucherById(id);

    if (!voucher) {
        throw new Error("Voucher not found");
    }

    if (voucher.employee_id !== employeeId) {
        throw new Error("Access denied");
    }

    if (voucher.status !== "DRAFT") {
        throw new Error("Only draft vouchers can be deleted");
    }

    return await voucherModel.deleteVoucher(id);
};

const submitVoucher = async (id, employeeId) => {
    const voucher = await voucherModel.findVoucherById(id);

    if (!voucher) {
        throw new Error("Voucher not found");
    }

    if (voucher.employee_id !== employeeId) {
        throw new Error("Access denied");
    }

    if (voucher.status !== "DRAFT") {
        throw new Error("Only draft vouchers can be submitted");
    }

    return await voucherModel.submitVoucher(id);
};
const getAllVouchers = async () => {
    return await voucherModel.findAllVouchers();
};

const getPendingVouchers = async () => {
    return await voucherModel.findPendingVouchers();
};

const approveVoucher = async (id, directorSignature) => {
    const voucher = await voucherModel.findVoucherById(id);

    if (!voucher) {
        throw new Error("Voucher not found");
    }

    if (voucher.status !== "SUBMITTED") {
        throw new Error("Only submitted vouchers can be approved");
    }

    if (!directorSignature) {
        throw new Error("Director signature is required");
    }

    return await voucherModel.approveVoucher(
        id,
        directorSignature
    );
};

const rejectVoucher = async (id, rejectionReason) => {
    const voucher = await voucherModel.findVoucherById(id);

    if (!voucher) {
        throw new Error("Voucher not found");
    }

    if (voucher.status !== "SUBMITTED") {
        throw new Error("Only submitted vouchers can be rejected");
    }

    if (!rejectionReason) {
        throw new Error("Rejection reason is required");
    }

    return await voucherModel.rejectVoucher(
        id,
        rejectionReason
    );
};

module.exports = {
    createVoucher,
    getVoucherById,
    getMyVouchers,
    updateVoucher,
    deleteVoucher,
    submitVoucher,
    getAllVouchers,
    getPendingVouchers,
    approveVoucher,
    rejectVoucher
};