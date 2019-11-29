const express = require('express')
const app = express();
var router = require("./Router/index");
var { dbCon } = require('./DBConnection/index');
var resumeSchema = require('./schema');

function createUsersTable() {
  var usersSql = "CREATE TABLE users (name VARCHAR(255), password VARCHAR(255), email VARCHAR(255))";
  dbCon.query(usersSql, function (err, result) {
    if(err) {
      console.log("something went wrong in when creating the users Table!!!")
    } else {
      console.log('Users is Created!!!')
    }
  });
}

function checkUserTableConnection() {
  dbCon.connect(function (err) {
    if (!err) {
      var selectUsersTable = "SELECT * from users";
      dbCon.query(selectUsersTable, function (err, result) {
        if(err) {
          createUsersTable();
        } else {
          console.log('Users table is already there!!!')
        }
      });
    } else {
      console.log(err)
    }
  });
}

function createResumeTable() {
  var resumeSql = `CREATE TABLE resume (
    ${resumeSchema.author} VARCHAR(255), 
    ${resumeSchema.uid} VARCHAR(255), 
    ${resumeSchema.profile_image} VARCHAR(255), 
    ${resumeSchema.profile_email} VARCHAR(255),
    ${resumeSchema.profile_phone} VARCHAR(255),
    ${resumeSchema.profile_highlights} JSON,
    ${resumeSchema.profile_overview} VARCHAR(8000),
    ${resumeSchema.profile_experience} JSON,
    ${resumeSchema.profile_education} JSON,
    ${resumeSchema.profile_certification} JSON,
    ${resumeSchema.profile_awards} JSON
  )`;
  dbCon.query(resumeSql, function (err, result) {
    if(err) {
      console.log("something went wrong in when creating the Resume Table!!!")
    } else {
      console.log('Resume Table is Created!!!')
    }
  });
}

function checkResumeTableConnection() {
  var selectResumeTable = "SELECT * from resume";
  dbCon.query(selectResumeTable, function (err, result) {
    if(err) {
      createResumeTable();
    } else {
      console.log('Resume table is already there!!!')
    }
  });
}


app.use(function (req, res, next) {
  checkUserTableConnection();
  checkResumeTableConnection();
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', router)

exports.nodeApp = app;