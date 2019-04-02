/******************************************************************************
 *  Execution       : default node          : cmd> add.js
 *                      
 * 
 *  Purpose         : added or create a new files
 * 
 *  @description    : By mutation create a new files
 * 
 *  @overview       : Create APIs using graphql 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 02-april-2019
 *
 ******************************************************************************/
/*
required files
*/
const { GraphQLNonNull, GraphQLObjectType} = require('graphql')
var typeUser = require('../types/users')
var modelUser = require('../../model/schema')

/*
create a add function
*/
exports