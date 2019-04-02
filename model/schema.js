/******************************************************************************
 *  Execution       : default node          : cmd> schema.js
 *                      
 * 
 *  Purpose         : Create Schema for Data
 * 
 *  @description    
 * 
 *  @overview       : Schema creating by using GraphQL APIs
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 02-april-2019
 *
 ******************************************************************************/
/*
required files
*/
var mongoose = require('mongoose')
/*
create instance of Schema
*/
var mongoSchema = mongoose.Schema;

/*
create schema for registration
*/
var schemaData = new mongoSchema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
var user = mongoose.model('user', schemaData);
module.exports = user