const functions = require('firebase-functions');

var { nodeApp } = require('./app/index')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(nodeApp);
