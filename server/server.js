var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;

var todoRouter = require('./routers/todo_router.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/task', todoRouter);

// Start listening on port
app.listen(port, function () {
    console.log('listening on port', port);
    
});

