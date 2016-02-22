var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var connect = require('./routes/connect');
var pg = require('pg');
var serverRequests = require('./routes/serverRequests');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/routes/serverRequests', serverRequests);

app.get('/*', function(req, res) {
    var file = req.params[0] || '/public/views/index.html';
    res.sendFile(path.join(__dirname, './', file));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});

