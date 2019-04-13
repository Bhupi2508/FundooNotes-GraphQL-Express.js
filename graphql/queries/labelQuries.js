/******************************************************************************
 *  Execution       : default node          : cmd> labelQuries.js
 *                      
 * 
 *  Purpose         : Generate a queries for type labeluser
 * 
 *  @description    : GraphQL query for specific fields on object and result will come exactly 
 *                    the same shape as request.
 * 
 *  @overview       : fundoo application 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 13-april-2019
 *
 ******************************************************************************/
/*
required files
*/
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var userType = require('../types/labelType').authType
var userModel = require('../../model/labelSchema')

/*
queries for user
*/
exports.labelQuery = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            users: {
                type: new GraphQLList(userType),
                resolve: function () {
                    const users = userModel.find().exec()
                    if (!users) {
                        throw new Error('Error')
                    }
                    return users
                }
            }
        }
    }
})