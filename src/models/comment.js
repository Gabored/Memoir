const comments = require("../controllers/comments");

const {model, Schema } = require('mongoose');

const commentSchema = new Schema({
    writer_user: {type: String, require: true},
    post_id: {type: String, require: true},
    body: {type: String, require: true},
    reply: {type: Boolean, require: true}
})

module.exports = model('comments',commentSchema);