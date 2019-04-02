/******************************************************************************
 *  Execution       : default node          : cmd> users.js
 *                      
 * 
 *  Purpose         : Generate a queries for type user
 * 
 *  @description    : GraphQL query for specific fields on object and result will come exactly 
 *                    the same shape as request.
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
const { GraphQLObjectType, GraphQLList } = require('graphql')
var userType = require('../types/users')
var userModel = require('../../model/schema')

/*
queries for user
*/
exports.queryType = new GraphQLObjectType({
    name: 'query',
    description: 'registration',
    fields: function () {
        return {
            users: {
                type: new GraphQLList(userType),
                resolve: function () {
                    const person = userModel.find().exec()
                    if (!person) {
                        throw new Error('Error')
                    }
                    return person
                }
            }
        }
    }
})