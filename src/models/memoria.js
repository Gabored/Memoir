const memorias = require("../controllers/memorias");

const {model, Schema } = require('mongoose');

const memoriaSchema = new Schema({
    user: {type: String, require: true},
    title: {type: String, require: true},
    body: {type: String},
    hashtag: {type: Array},
    media: {type: Array}
})

module.exports = model('memorias', memoriaSchema);