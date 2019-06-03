/******************************************************************************
 *  Execution       : default node          : cmd> schema.js
 *                      
 * 
 *  Purpose         : Create Schema for Data
 * 
 *  @description    
 * 
 *  @overview       : fundoo application
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 02-april-2019
 *
 ******************************************************************************/
/**
 * @requires files
 */
var mongoose = require('mongoose')

//create instance of Schema
var mongoSchema = mongoose.Schema;


/**
 * @purpose : store data in database based on this schema
 * @param {String} firstname
 * @param {String} lastname
 * @param {String} email
 * @param {String} password
 * @param {timestamps} timestamps
 */
var schemaData = new mongoSchema({
    firstname: {
        type: String,
        minlength: [3, 'min length is 3 for firstname'],
        maxlength: [200, 'max length 200 for firstname']
    },
    lastname: {
        type: String,
        minlength: [3, 'min length is 3 for lastname'],
        maxlength: [200, 'max length 200 for lastname']
    },
    email: {
        type: String,
        unique: true,
        minlength: [3, 'min length is 3 for email'],
        maxlength: [200, 'max length 200 for email']
    },
    password: {
        type: String,
        minlength: [3, 'min length is 3 for password'],
        maxlength: [200, 'max length 200 for password']
    },
    verification: {
        type: Boolean,
        default: false
    },
    isGitVerify: {
        type: Boolean,
        default: false
    },
    loginName: {
        type: String,
        minlength: [3, 'min length is 3 for loginName'],
        maxlength: [200, 'max length 200 for loginName']
    },
    gitID: {
        type: String,
    },
    access_Token: {
        type: String,
    },
    ProfilePicUrl: {
        type: String
    }
}, {
        timestamps: true
    })


//connect database using mongoose
var user = mongoose.model('user', schemaData);
module.exports = user