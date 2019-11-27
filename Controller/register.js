var { dbCon } = require('../DBConnection/index');

exports.singUpFunc = function (req, res) {
  let data = req.body;
  var checkemailSQL = `SELECT * FROM users WHERE email = '${data.email}'`;
  dbCon.query(checkemailSQL, function (err, countMail) {
    if(err || (countMail && countMail.length === 0)) {
      var insertSql = `INSERT INTO users (name, password, email) VALUES ('${data.name}', '${data.password}', '${data.email}')`;
      dbCon.query(insertSql, function (err, result) {
        if (err) {
          console.log("something went wrong in when creating the users Table!!!")
        } else {
          let detail={};
          detail.message="successfully detail inserted";
          detail.status=200;
          res.send(detail)
        }
      });
    } else {
      let detail={};
      detail.message="This email is already is presented";
      detail.status= 200;
      res.send(detail)
    }
  });
}