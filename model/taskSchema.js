const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    details: String,
    task_image: String,
    status: String,
})

const Tasks = mongoose.model('myTasks', taskSchema);

module.exports = Tasks;