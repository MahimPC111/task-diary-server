const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    taskId: String,
    comment: String,
})

const Comments = mongoose.model('comments', commentSchema);

module.exports = Comments;