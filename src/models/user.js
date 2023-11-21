const users = require("../controllers/users");

const {model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: {type: String, require: true},
    surname: {type: String, require: true},
    username: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    location: {type: String},
    interests: {type: String, require: true},
})

module.exports = model('users', userSchema);