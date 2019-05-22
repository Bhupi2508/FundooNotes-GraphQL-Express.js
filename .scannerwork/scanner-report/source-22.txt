/******************************************************************************
 *  @Execution      : default node          : cmd> index.js
 *                      
 * 
 *  @Purpose        : connect all the files
 * 
 *  @description    : index.js have server connections for all the graphql files
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
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var queryType = require('../queries/labelQuries').labelQuery
var mutation = require('../mutations/mutation');

/**
 * @exports userSchema
 * @purpose : return query and mutation for users
 */
exports.userSchema = new GraphQLSchema({
    query: queryType,
    mutation: mutation
})
