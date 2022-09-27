const express = require('express');
const app = express();
app.use(express.json());    //enabling app to parse json data
const mongoose = require ('./database/mongoose');

//Importing List
const List = require('./database/models/list');
//Importing Tasks
const Tasks = require('./database/models/tasks');
const Task = require('./database/models/tasks');
const { deleteOne } = require('./database/models/list');


//Enabling CORS - CROSS ORIGIN REQUEST SECURITY
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Controle-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Creating URL endpoints
app.get('/list', (req, res) => {
    List.find({})
         .then(lists => res.send(lists))
         .catch((error) => console.log(error))
});

app.post('/list', (req, res) => {
    (new List({'title': req.body.title}))
        .save()
        .then((list)=> res.send(list))
        .catch((error) => console.log(error));
});

app.get('/list/:listId', (req, res) => { 
    List.find({ _id: req.params.listId })
        .then((lists) => res.send(lists))
        .catch((error) => console.log(error));
});

app.delete('/list', (req, res) => {
    List.deleteMany()
        .then((lists) => res.send(lists))
        .catch((error) => console.log(error));
});

app.patch('/list/:listId', (req, res) =>{
    List.findOneAndUpdate({_id: req.params.listId}, {$set: req.body})
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
});

app.delete('/list/:listId', (req, res) =>{
    List.findByIdAndDelete(req.params.listId)
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
});

//Creating HTTP request for Task
app.get('/list/:listId/tasks', (req, res) => {
    Task.find({ _listId: req.params.listId})
        .then((tasks) => res.send(tasks))
        .catch((error) => console.log(error));
});

app.post('/list/:listId/tasks', (req, res) =>{
    (new Task({'_listId': req.params.listId, 'title': req.body.title}))
        .save()    
        .then((tasks) => res.send(tasks))
        .catch((error) => console.log(error));
});

app.listen(3000, () => console.log('Server connected to port 3000'));
