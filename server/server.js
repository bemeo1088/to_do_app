var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;

var todo_router = require('./routers/todo_router.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/todo', todo_router);

// Start listening on port
app.listen(port, function () {
    console.log('listening on port', port);
    
});