const medias = require("../controllers/medias");

const {model, Schema } = require('mongoose');

const mediaSchema = new Schema({
    link: {type: String, require: true},
    type: {type: String, require: true}
})

module.exports = model('medias', mediaSchema);