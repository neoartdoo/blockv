var express = require("express");
var path = require("path");
var jsonfile = require("jsonfile");
var morgan = require("morgan");
var fs = require('fs');
var bodyParser = require('body-parser');

var serverPort = 3005;

exports.APP = express();

exports.APP.use(morgan('short'));
exports.APP.use(bodyParser.json());
exports.APP.use(express.static(path.join(__dirname, '/public')));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

exports.APP.use(allowCrossDomain);

var emailsFilePath = './public/emails.json';

exports.APP.post('/api/emails', function (req, res) {
    try {
        // res.header('Access-Control-Allow-Origin', '*');
        // res.header('Access-Control-Allow-Origin', "*");
        // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        // res.header('Access-Control-Allow-Headers', 'Content-Type');
        var emailText = req.body['emailText'];
        console.log('req.body = ' + JSON.stringify(req.body));
        var preBuffer = new Buffer('User emails:' + '\n\n');
        var file = 'server/public/emails.json';
        var data = fs.readFileSync(file); //read existing contents into data
        if (data.indexOf(preBuffer) >= 0) data = data.slice(preBuffer.length, data.length);
        var fd = fs.openSync(file, 'w+');
        var buffer = new Buffer(emailText + '\n');

        fs.writeSync(fd, preBuffer, 0, preBuffer.length, 0); //write header
        fs.writeSync(fd, buffer, 0, buffer.length, preBuffer.length); //write new data
        fs.writeSync(fd, data, 0, data.length, preBuffer.length + buffer.length); //append old data
        fs.close(fd);
        res.status(201).send('success');
    } catch (err) {
        res.status(400).send('error: ' + err);
    }
});

exports.APP.get('/api/emails', function (req, res) {
    res.sendFile(path.join(__dirname, emailsFilePath));
});

exports.APP.listen(serverPort, function () {
    console.log('Server running on port: ' + serverPort + '\n');
});
