const users = require("../controllers/users");

const {model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: {type: String, require: true},
    surname: {type: String, require: true},
    username: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String},
    location: {type: String},
    interests: {type: String},
})

module.exports = model('users', userSchema);