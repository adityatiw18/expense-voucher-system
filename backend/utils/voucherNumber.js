const generateVoucherNumber = () => {
    return `VCH-${Date.now()}`;
};

module.exports = { generateVoucherNumber };