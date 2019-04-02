/******************************************************************************
 *  Execution       : default node          : cmd> index.js
 *                      
 * 
 *  Purpose         : connect all the files
 * 
 *  @description    : index.js have server connections for all the graphql files
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
const { GraphQLSchema, GraphQLObjectType } = require('graphql')
var queryUser = require('./queries/users')
var mutation = require('./mutations/mutation');