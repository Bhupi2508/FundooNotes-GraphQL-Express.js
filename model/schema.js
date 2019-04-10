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
/*
required files
*/
var mongoose = require('mongoose')
/*
create instance of Schema
*/
var mongoSchema = mongoose.Schema;

/*
create schema for Database
*/
var schemaData = new mongoSchema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verification: {
        type: Boolean,
        default: false
    }
}, {
        timestamps: true
    })

/*
connect database using mongoose
*/
var user = mongoose.model('user', schemaData);
module.exports = user