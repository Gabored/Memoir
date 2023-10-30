const reactions = require("../controllers/reactions");

const {model, Schema } = require('mongoose');

const reactionSchema = new Schema({
    icon: {type: String, require: true},
    name: {type: String, require: true},
    color: {type: String, require: true}
})

module.exports = model('reactions', reactionSchema);