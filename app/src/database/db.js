const mysql = require("mysql2/promise");

const dbConfig = require("./config");

async function database() {
  const conn = await mysql.createConnection(dbConfig);
  return conn;
}

module.exports = database;
