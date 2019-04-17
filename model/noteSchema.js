/******************************************************************************
 *  @Execution      : default node          : cmd> noteSchema.js
 *                      
 * 
 *  @Purpose        : Create Schema for notes
 * 
 *  @description    : Create a note schema which store in Database
 * 
 *  @overview       : fundoo application
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 15-april-2019
 *
 ******************************************************************************/
/**
 * @requires files
 */
var mongoose = require('mongoose');

var mongoSchema = mongoose.Schema;

/**
 * @purpose : store data in database based on this schema
 * @param {String} userID 
 * @param {String} title  
 * @param {String} description 
 * @param {String} reminder  
 * @param {String} color 
 * @param {String} img
 * @param {String} archieve
 * @param {String} trash
 * @param {String} pin
 * @param {Array} label
 * @param {timestamps} timestamps
 */
var noteSchema = new mongoSchema({
    userID: {
        type: mongoSchema.Types.ObjectId,
        ref: 'schemaData'
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    reminder: {
        type: String
    },
    color: {
        type: String
    },
    img: {
        type: String
    },
    archieve: {
        type: Boolean
    },
    trash: {
        type: Boolean
    },
    pin: {
        type: Boolean
    },
    label: {
        type: mongoSchema.Types.labelName,
        ref: 'labelSchema'
    }
},
    {
        timestamps: true
    })

//connect database using mongoose
var userLabel = mongoose.model('notes', noteSchema);

/**
 * @exports userLabel
 */
module.exports = userLabel