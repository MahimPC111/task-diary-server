const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(cors())
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/taskDiary')
const Tasks = require('./model/taskSchema')


const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.md0ymip.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB, {
    useNewUrlParser: true,
    // userCreateIndex: true,
    useUnifiedTopology: true,
    // userFindAndModify: false
}).then(() => {
    console.log('Connection successful')
}).catch(err => console.log(err.name, err.message))



app.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body);
    const result = await task.save();
    res.send(result)
})

app.get('/tasks', async (req, res) => {
    const result = await Tasks.find();
    res.send(result)
})

app.get('/tasks/:id', async (req, res) => {
    const result = await Tasks.findOne({ _id: req.params.id });
    res.send(result)
})

app.patch('/tasks/:id', async (req, res) => {
    const updatedTask = {
        $set: {
            title: req.body.title,
            details: req.body.details
        }
    }
    const result = await Tasks.updateOne({ _id: req.params.id }, updatedTask);
    res.send(result)
})

app.get('/', (req, res) => {
    res.send('Great! Task diary server is running.')
})

app.listen(port, () => {
    console.log('listening on port', port)
})