/******************************************************************************
 *  @Execution      : default node          : cmd> mongoose.js
 *                      
 * 
 *  @Purpose        : connect server to mongoDB
 * 
 *  @description    : Connected with mongoDB database
 * 
 *  @overview       : MongoDB connections
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 03-april-2019
 *
 ******************************************************************************/
/**
 * @requires files
 */
var config = require('./config')
var mongoose = require('mongoose')

/**
 * @param{} create a empty function and export
 * @retutn connectivity
 * @exports function{}
 */
module.exports = function () {
    mongoose.Promise = global.Promise;
    mongoose.set('useCreateIndex', true)

    //connect to the database by given url
    var db = mongoose.connect(config.db, { useNewUrlParser: true });
    mongoose.connection.on('error', function (err) {
        console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.err);
    }).on('open', function () {
        console.log('#####################################################################################');
        console.log('##############                connected with MongoDb                   ##############');
        console.log('#####################################################################################\n');
    })
    return db;
};