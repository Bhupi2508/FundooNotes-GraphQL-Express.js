/******************************************************************************
 *  @Execution      : default node          : cmd> labelSchema.js
 *                      
 * 
 *  @Purpose        : Create Schema for labelData
 * 
 *  @description    : Create a label schema which store in Database
 * 
 *  @overview       : fundoo application
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 13-april-2019
 *
 ******************************************************************************/
/**
 * @requires files
 */
var mongoose = require('mongoose');

var mongoSchema = mongoose.Schema;


/**
 * @purpose : store data in database based on this schema
 * @param {number} userID
 * @param {String} labelName
 * @param {timestamps} timestamps
 */
var labelSchema = new mongoSchema({
    userID: {
        type: mongoSchema.Types.ObjectId,
        ref: 'schemaData'
    },
    labelName: {
        type: String
    }
},
    {
        timestamps: true
    })

//connect database using mongoose
var userLabel = mongoose.model('label', labelSchema);
module.exports = userLabel