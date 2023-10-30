const hashtags = require("../controllers/hashtags");

const {model, Schema } = require('mongoose');

const hashtagSchema = new Schema({
    name: {type: String, require: true},
    img: {type: String, require: true}
})

module.exports = model('hashtags', hashtagSchema);