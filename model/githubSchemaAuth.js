var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create User Schema
const userSchema = new mongoose.Schema({
    userID: {
        type: mongoSchema.Types.ObjectId,
        ref: 'schemaData'
    },
    accessToken: {
        type: String
    },
    refreshToken: {
        type: String
    },
    timeExpires: {
        type: Date
    }
});

module.exports = mongoose.model('githubAuth', userSchema)