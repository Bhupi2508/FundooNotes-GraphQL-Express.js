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
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var queryType = require('../queries/users').queryType
var mutation = require('../mutations/mutation');

/*
Create a mutation for schema
*/
exports.userSchema = new GraphQLSchema({
    query : queryType,
    mutation : new GraphQLObjectType({
        name : 'Mutation',
        fields : mutation
    })
})