var mysql = require('mysql');

exports.dbCon = mysql.createConnection({
  host: "db4free.net",
  user: "smchinna",
  password: "190696@Chinna",
  database: 'resume_maker'
});