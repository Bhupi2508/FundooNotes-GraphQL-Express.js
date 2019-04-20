var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create User Schema
const userSchema = new mongoose.Schema({
    login: {
        type: String
    },
    name: {
        type: String
    },
    company: {
        type: String
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
},
{
    timestamps: true
});

var model = mongoose.model('githubAuth', userSchema)
module.exports = model