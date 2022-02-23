const PORT = process.env.PORT || 3000;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api')
var usersRouter = require('./routes/users');

var app = express();

var server = app.listen(PORT);
var io = require('socket.io')(server)

app.use(logger('dev'));

app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    req.io = io
    next()
})

app.use('/', indexRouter);
app.use('/api', apiRouter)
app.use('/users', usersRouter);

io.on('connection', socket => {
    console.log('[#] Socket On!')
})

module.exports = app;
