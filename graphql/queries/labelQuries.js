/******************************************************************************
 *  @Execution      : default node          : cmd> labelQuries.js
 *                      
 * 
 *  @Purpose        : Generate a queries for type labeluser
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
/**
 * @requires files
 */
var GraphQLObjectType = require('graphql').GraphQLObjectType;
const { GraphQLList, GraphQLString } = require('graphql')
var labelType = require('../types/labelType').labelauthType
var userType = require('../types/users').userType
var labelModel = require('../../model/labelSchema')
var userModel = require('../../model/schema')

//create a empty function
var queries = function(){}

/**
 * @exports labelQuery
 * @returns {Parameters}, for users label
 * @function resolvers
 * @returns {users1}
 */
queries.prototype.labelQuery = new GraphQLObjectType({
    name: 'data',
    fields: function () {
        return {
            labelUsers: {
                type: new GraphQLList(labelType),
                args: {
                    userID: {
                        type: GraphQLString
                    }
                },
                resolve: async function (root, args) {
                    //if user find data then return otherwise error
                    const users1 = await labelModel.find({ "userID": args.userID })
                    if (!users1) {
                        throw new Error('Error')
                    }
                    return users1
                }
            },

            /**
             * @returns {users}, for users function
             * @function resolvers
             * @returns {users2}
             */
            users: {
                type: new GraphQLList(userType),
                resolve: async function () {
                    const users2 = await userModel.find().exec()
                    if (!users2) {
                        throw new Error('Error')
                    }
                    return users2
                }
            }
        }
    }
})

/**
 * @exports queries
 */
module.exports = new queries()