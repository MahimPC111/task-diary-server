const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(cors())
app.use(express.json());

const Tasks = require('./model/taskSchema')
const Comments = require('./model/commentSchema')


const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.md0ymip.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connection successful')
}).catch(err => console.log(err.name, err.message))


// posting new tasks
app.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body);
    const result = await task.save();
    res.send(result)
})

// getting all tasks for media route
app.get('/allTasks', async (req, res) => {
    const query = {
        email: req.query.email
    }
    const result = await Tasks.find(query);
    res.send(result)
})

// getting tasks based on status
app.get('/tasks', async (req, res) => {
    const query = {
        email: req.query.email,
        status: req.query.status
    }
    const result = await Tasks.find(query);
    res.send(result)
})

// getting a single task
app.get('/tasks/:id', async (req, res) => {
    const result = await Tasks.findOne({ _id: req.params.id });
    res.send(result)
})

// update a task
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

// modify task status
app.patch('/completedTasks/:id', async (req, res) => {
    const completedTask = {
        $set: {
            status: req.body.status,
        }
    }
    const result = await Tasks.updateOne({ _id: req.params.id }, completedTask);
    res.send(result)
})

// delete a task
app.delete('/tasks/:id', async (req, res) => {
    const result = await Tasks.deleteOne({ _id: req.params.id })
    res.send(result)
})

// post comments of a task
app.post('/comments', async (req, res) => {
    const comment = new Comments(req.body);
    const result = await comment.save();
    res.send(result)
})

// getting all comments of a task
app.get('/allComments', async (req, res) => {
    const result = await Comments.find({ taskId: req.query.taskId });
    res.send(result)
})



// checking server
app.get('/', (req, res) => {
    res.send('Great! Task diary server is running.')
})

app.listen(port, () => {
    console.log('listening on port', port)
})