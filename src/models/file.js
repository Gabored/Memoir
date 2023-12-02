const { model, Schema } = require('mongoose');
 
const schema = new Schema({
    title: { type: Array },
})
 
module.exports = model('attachments', schema);