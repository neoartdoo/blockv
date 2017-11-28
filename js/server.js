var express = require('express');
var path = require("path");
var jsonfile = require("jsonfile");
var app = express();


console.log('0000000000000000000000');


app.use(express.static(path.join(__dirname, '/public')));

var filePath = './public/emails.json';

app.post('/api/emails', function(req, res) {
    console.log('POST /api/emails');
    jsonfile.writeFile(filePath, 'new string', {flag: 'a'}, function (err) {
        console.error(err);
    })
    // Run your LED toggling code here
});

app.get('/api/emails', function(req, res) {
    console.log('GET /api/emails');
    res.sendFile(path.join(__dirname, filePath));
    // Run your LED toggling code here
});

// app.get('*', function (req, res) {
//     console.log('GET main page');
//     res.sendFile(path.join(__dirname, '../index.html'));
// });
//
// app.listen(3000, function () {
//     console.log('Server running on port: ' + 3000 + '\n');
// });