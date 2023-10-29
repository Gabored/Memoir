const memorias = require("../controllers/users");

const {model, Schema } = require('mongoose');

const memoriaSchema = new Schema({
    title: {type: String, require: true},
    body: {type: String},
    hashtag: {type: Array},
    media: {type: Array}
})

module.exports = model('memorias', memoriaSchema);