var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

var singUpController = require('../Controller/register')
var loginController = require('../Controller/login');
var resumeController = require('../Controller/resume');

router.use(bodyParser({ limit: '50mb' }));

router.use(bodyParser.urlencoded({ extended: true, parameterLimit: 500000 }));

router.post('/register', (req, res) => {
  singUpController.singUpFunc(req, res)
})

router.post('/login', (req, res) => {
  loginController.loginFunc(req, res)
})

router.post('/create_resume', loginController.authenticate, (req, res) => {
  resumeController.createResume(req, res)
})

router.get('/get_resume', loginController.authenticate, (req, res) => {
  resumeController.getResumeFunc(req, res)
})

router.get('/get_resume_by_id', loginController.authenticate, (req, res) => {
  resumeController.getResumeByIdFunc(req, res)
})

module.exports = router;