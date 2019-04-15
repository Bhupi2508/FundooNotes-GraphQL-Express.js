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


//connect database using mongoose
var user = mongoose.model('user', schemaData);
module.exports = user