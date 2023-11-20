const { model, Schema } = require('mongoose');

const schema = new Schema({
    name: { type: String },
    filename: { type: String },
    todoId: { type: String }
})

module.exports = model('attachments', schema);