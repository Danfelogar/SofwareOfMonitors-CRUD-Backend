const mysql = require("mysql2");
// const { connect } = require("../softwareDeMonitorias-backend/config/connection");

const db_connection = mysql
    .createConnection({
    host: "localhost", // HOST NAME
    user: "root", // USER NAME
    database: "db-monitoring-software", // DATABASE NAME
    password: "", // DATABASE PASSWORD
    })
    .on("error", (err) => {
    console.log("Failed to connect to db-monitoring-software ", err);
    });

module.exports = db_connection;