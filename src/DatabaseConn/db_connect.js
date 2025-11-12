import config from "./config.js";
import mysql from "mysql2";
import util from "util";

const connect = mysql.createConnection({
    host: config.DB_Host,
    user: config.DB_Username,
    password: config.DB_Password,   // ✅ corrected
    database: config.DB_Name
});

connect.connect((err) => {
    if (err) {
        console.log("❌ Error in database connection:", err);
    } else {
        console.log("✅ Database connected successfully");
    }
});

const query = util.promisify(connect.query).bind(connect);

// ✅ correct export
export default query;

