var express = require("express");
var path = require("path");
var jsonfile = require("jsonfile");
var morgan = require("morgan");

exports.APP = express();

exports.APP.use((morgan as any)('short'));
exports.APP.use(express.static(path.join(__dirname, '/public')));

exports.APP.get('/api/emails', function (req, res) {
    console.log('GET api/emails');
    res.sendFile(path.join(__dirname, '../public/emails.json'));
});

// exports.APP.post('/api/emails', function (req, res) {
//     res.redirect(307, '/api/users');
// });

exports.APP.listen('3002', function () {
    console.log('Server running on port: ' + '3002' + '\n');
});