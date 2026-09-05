const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "expense_voucher_db",
    user: "adityatiwari",
    //password: "your_postgres_password"
});

module.exports = pool;