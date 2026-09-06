const express = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
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
} = require("../controllers/voucherController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware("EMPLOYEE"),
    upload.single("document"),
    createVoucher
);

router.get(
    "/pending",
    authMiddleware,
    roleMiddleware("DIRECTOR"),
    getPendingVouchers
);

router.get("/my", authMiddleware, roleMiddleware("EMPLOYEE"), getMyVouchers);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("DIRECTOR", "ACCOUNTS"),
    getAllVouchers
);

router.get("/:id", authMiddleware, getVoucherById);

router.put("/:id", authMiddleware, roleMiddleware("EMPLOYEE"), updateVoucher);

router.delete("/:id", authMiddleware, roleMiddleware("EMPLOYEE"), deleteVoucher);

router.post("/:id/submit", authMiddleware, roleMiddleware("EMPLOYEE"), submitVoucher);

router.post(
    "/:id/approve",
    authMiddleware,
    roleMiddleware("DIRECTOR"),
    upload.single("directorSignature"),
    approveVoucher
);

router.post(
    "/:id/reject",
    authMiddleware,
    roleMiddleware("DIRECTOR"),
    rejectVoucher
);

module.exports = router;