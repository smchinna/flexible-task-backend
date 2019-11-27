var jwt = require('jsonwebtoken');

var { dbCon } = require('../DBConnection/index');

var secret_key = 'smchinna005';

exports.loginFunc = function (req, res) {
  let data = req.body;
  var checkemailSQL = `SELECT * FROM users WHERE email = '${data.username}' AND password = '${data.password}'`;
  dbCon.query(checkemailSQL, function (err, countMail) {
    if (err || (countMail && countMail.length === 0)) {
      let result = {}
      result.status = 401;
      result.message = "your username is incorrect";
      res.send(result);
    } else {
      let result = {}
      let token = encryptUser(data)
      result.status = 200;
      result.token = token;
      result.name = data.name;
      result.message = "successfull"
      res.send(result);
    }
  })
}

exports.authenticate = function (req, res, next) {
  let data = decrypt(req.headers.authorization);
  var checkemailSQL = `SELECT * FROM users WHERE email = '${data.username}' AND password = '${data.password}'`;
  dbCon.query(checkemailSQL, function (err, countMail) {
    if (err || (countMail && countMail.length === 0)) {
      let result = {}
      result.status = 401;
      result.message = "your token is incorrect";
      res.send(result)
    } else {
      req.body.author = data.username;
      next();
    }
  })
}

function encryptUser(obj) {
  var token = jwt.sign({ 'username': obj.username, password: obj.password }, secret_key);
  return token;
}

function decrypt(token) {
  var decoded = jwt.verify(token, secret_key);;
  return decoded;
}

