const medias = require("../controllers/medias");

const {model, Schema } = require('mongoose');

const mediaSchema = new Schema({
    title: { type: Array },
})

module.exports = model('medias', mediaSchema);