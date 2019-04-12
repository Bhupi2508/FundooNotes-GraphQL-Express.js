import { request } from "http";
import { Type } from "protobufjs";

/******************************************************************************
 *  Execution       : default node          : cmd> labelSchema.js
 *                      
 * 
 *  Purpose         : Create Schema for labelData
 * 
 *  @description    : Create a label schema which store in Database
 * 
 *  @overview       : fundoo application
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 11-april-2019
 *
 ******************************************************************************/
/*
required files
*/
var mongoose = require('mongoose');

var mongooseSchema = mongoose.Schema;

/*
create schema for labels
*/
var labelSchema = new mongooseSchema({
    userID: {
        type: object.Type.Objectid,
        'ref': schemaData
    },

    label: {
        type: String
    }
})

var user = mongoose.model('label', labelSchema);
module.exports = user