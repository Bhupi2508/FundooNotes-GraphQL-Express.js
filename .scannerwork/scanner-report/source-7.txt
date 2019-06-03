/******************************************************************************
 *  @Execution      : default node          : cmd> collabatorsSchema.js
 *                      
 * 
 *  @Purpose        : MongoDB schema for collabators
 * 
 *  @description    : using this schema we store collabators data in database
 * 
 *  @overview       : fundoo application
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 14-may-2019
 *
 ******************************************************************************/
/**
 * @requires files
 */
var mongoose = require('mongoose');

//connect the schema with database
var mongoSchema = mongoose.Schema;


/**
 * @purpose : store data in database based on this schema
 * @param {number} userID
 * @param {String} labelName
 * @param {timestamps} timestamps
 */
var collaboratorSchema = new mongoSchema({
    userID: {
        type: mongoSchema.Types.ObjectId,
        ref: 'schemaData'
    },
    noteID: {
        type: mongoSchema.Types.ObjectId,
        ref: 'noteSchema'
    },
    collaboratorID: {
        type: mongoSchema.Types.ObjectId,
        ref: 'schemaData'
    },
},
    {
        timestamps: true
    })


//connect database using mongoose
var collaborator = mongoose.model('collaborators', collaboratorSchema);

/**
 * @exports collaborator
 */
module.exports = collaborator