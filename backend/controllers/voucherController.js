const voucherService = require("../services/voucherService");

const createVoucher = async (req, res) => {
    try {
        const voucherData = {
            ...req.body,
            documentPath: req.file ? req.file.path : null
        };

        const voucher = await voucherService.createVoucher(
            voucherData,
            req.user.id
        );

        res.status(201).json({
            message: "Voucher created successfully",
            voucher
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};

const getVoucherById = async (req, res) => {
    try {
        const voucher = await voucherService.getVoucherById(
    req.params.id,
    req.user.id,
    req.user.role
);

        res.json({
            voucher
        });
    } catch (error) {
        console.error(error);
        if (error.message === "Access denied") {
    return res.status(403).json({ message: error.message });
}
        if (error.message === "Voucher not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        res.status(500).json({
            message: error.message
        });
    }
};

const getMyVouchers = async (req, res) => {
    try {
        const vouchers = await voucherService.getMyVouchers(req.user.id);

        res.json({ vouchers });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateVoucher = async (req, res) => {
    try {
        const voucher = await voucherService.updateVoucher(
            req.params.id,
            req.user.id,
            req.body
        );

        res.json({
            message: "Voucher updated successfully",
            voucher
        });
    } catch (error) {
        const status =
            error.message === "Voucher not found" ? 404 :
            error.message === "Access denied" ? 403 :
            error.message === "Only draft vouchers can be edited" ? 400 :
            500;

        res.status(status).json({
            message: error.message
        });
    }
};

const deleteVoucher = async (req, res) => {
    try {
        await voucherService.deleteVoucher(
            req.params.id,
            req.user.id
        );

        res.json({
            message: "Voucher deleted successfully"
        });
    } catch (error) {
        const status =
            error.message === "Voucher not found" ? 404 :
            error.message === "Access denied" ? 403 :
            error.message === "Only draft vouchers can be deleted" ? 400 :
            500;

        res.status(status).json({
            message: error.message
        });
    }
};

const submitVoucher = async (req, res) => {
    try {
        const voucher = await voucherService.submitVoucher(
            req.params.id,
            req.user.id
        );

        res.json({
            message: "Voucher submitted successfully",
            voucher
        });
    } catch (error) {
        const status =
            error.message === "Voucher not found" ? 404 :
            error.message === "Access denied" ? 403 :
            error.message === "Only draft vouchers can be submitted" ? 400 :
            500;

        res.status(status).json({
            message: error.message
        });
    }
};

const getAllVouchers = async (req, res) => {
    try {
        const vouchers = await voucherService.getAllVouchers();

        res.json({ vouchers });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getPendingVouchers = async (req, res) => {
    try {
        const vouchers = await voucherService.getPendingVouchers();

        res.json({ vouchers });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const approveVoucher = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.file) {
            return res.status(400).json({
                message: "Director signature image is required"
            });
        }

        const directorSignature = req.file.filename;

        const voucher = await voucherService.approveVoucher(
            id,
            directorSignature
        );

        res.json({
            message: "Voucher approved successfully",
            voucher
        });
    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message
        });
    }
};

const rejectVoucher = async (req, res) => {
    try {
        const voucher = await voucherService.rejectVoucher(
            req.params.id,
            req.body.rejectionReason
        );

        res.json({
            message: "Voucher rejected successfully",
            voucher
        });
    } catch (error) {
        const status =
            error.message === "Voucher not found" ? 404 :
            error.message === "Only submitted vouchers can be rejected" ? 400 :
            error.message === "Rejection reason is required" ? 400 :
            500;

        res.status(status).json({
            message: error.message
        });
    }
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