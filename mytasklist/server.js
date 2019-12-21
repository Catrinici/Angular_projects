var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// var index = require('./routes/index');
// var tasks = require('./routes/tasks');
const mongoose = require('mongoose');


var port = 8000;

var app = express();

//DB connection
mongoose.connect('mongodb://localhost/tasks', { useNewUrlParser: true });

const TasksSchema = new mongoose.Schema({
        title: String,
        isDone: Boolean
    })
    // create an object that contains methods for mongoose to interface with MongoDB
const Task = mongoose.model('Task', TasksSchema);


//Vie Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set static folder
app.use(express.static(path.join(__dirname, 'client')));

//Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', tasks);

//Routes go here 
app.get('/', function(req, res) {
    Task.find({}, function(err, results) {
        if (err) { console.log(err) }
        res.render('index', { tasks: results })
    })
})

app.listen(port, function() {
    console.log(`Server started at port ${port}`);
})