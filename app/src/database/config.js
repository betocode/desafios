module.exports = {
  host: process.env.SQL_ADDRESS,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  port: process.env.SQL_PORT,
  ssl: { rejectUnauthorized: false },
};
