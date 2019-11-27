var uniqid = require('uniqid');

var { dbCon } = require('../DBConnection/index');
var { resumeSchema } = require('../schema');

exports.createResume = function (req, res) {
  let data = req.body;
  data.uid = uniqid();
  let createQuery = `INSERT INTO resume (
    ${resumeSchema.author}, 
    ${resumeSchema.uid},
    ${resumeSchema.profile_image},
    ${resumeSchema.profile_email},
    ${resumeSchema.profile_phone},
    ${resumeSchema.profile_highlights},
    ${resumeSchema.profile_overview},
    ${resumeSchema.profile_experience},
    ${resumeSchema.profile_education},
    ${resumeSchema.profile_certification},
    ${resumeSchema.profile_awards}
    ) VALUES (
      '${data.author}', 
      '${data.uid}', 
      '${data.profile_image}',
      '${data.profile_email}',
      '${data.profile_phone}',
      '${JSON.stringify(data.profile_highlights)}',
      '${data.profile_overview}',
      '${JSON.stringify(data.profile_experience)}',
      '${JSON.stringify(data.profile_education)}',
      '${JSON.stringify(data.profile_certification)}',
      '${JSON.stringify(data.profile_awards)}'
    )`;
    dbCon.query(createQuery, function (err, result) {
      if (err) {
        let detail={};
        detail.message="something went wrong in when inserting the resume!!!";
        detail.status=500;
        res.send(detail)
      } else {
        let detail={};
        detail.message="successfully resume inserted";
        detail.status=200;
        res.send(detail)
      }
    });
}

exports.getResumeFunc = function(req, res) {
  let data = req.body;
  let getQuery = `SELECT * FROM resume WHERE ${resumeSchema.author} = '${data.author}'`;
  dbCon.query(getQuery, function (err, resumeData) {
    if (err || (resumeData && resumeData.length === 0)) {
      let result = {}
      result.status = 200;
      result.message = "NO Data";
      result.data = []
      res.send(result)
    } else {
      let result = {}
      result.status = 200;
      result.data = resumeData
      res.send(result)
    }
  })
}

exports.getResumeByIdFunc = function(req, res) {
  let data = req.body;
  data.resumeId = req.query.resumeId;
  let getQuery = `SELECT * FROM resume WHERE ${resumeSchema.author} = '${data.author}' AND ${resumeSchema.uid} = '${data.resumeId}'`;
  dbCon.query(getQuery, function (err, resumeData) {
    if (err || (resumeData && resumeData.length === 0)) {
      let result = {}
      result.status = 200;
      result.message = "NO Data";
      result.data = []
      res.send(result)
    } else {
      let result = {}
      result.status = 200;
      result.data = resumeData
      res.send(result)
    }
  })
}
