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
var noteType = require('../types/noteTypes').noteAuthType
var labelModel = require('../../model/labelSchema')
var userModel = require('../../model/schema')

//create a empty function
var queries = function () { }

/**
 * @exports labelQuery
 * @returns {Parameters}, for users label
 * @function resolvers
 * @returns {users_label}
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
                    const users_label = await labelModel.find({ "userID": args.userID })
                    if (!users_label) {
                        throw new Error('Error')
                    }
                    return users_label
                }
            },

            /**
             * @returns {users}, for users function
             * @function resolvers
             * @returns {user_s}
             */
            users: {
                type: new GraphQLList(userType),
                resolve: async function () {
                    const user_s = await userModel.find().exec()
                    if (!user_s) {
                        throw new Error('Error')
                    }
                    return user_s
                }
            },

            /**
           * @returns {noteQuery}, for users function
           * @function resolvers
           * @returns {users_note}
           */
            noteUsers: {
                type: new GraphQLList(noteType),
                args: {
                    userID: {
                        type: GraphQLString
                    }
                },
                resolve: async function (root, args) {
                    const users_note = await userModel.find({ "userID": args.userID })
                    if (!users_note) {
                        throw new Error('Error')
                    }
                    return users_note
                }
            },

            /**
             * @returns {gitAuth}, for users function
             * @function resolvers
             * @returns {user_auth}
             */
            gitAuth: {
                type: new GraphQLList(userType),
                resolve: async function () {
                    const user_auth = await userModel.find().exec()
                    if (!user_auth) {
                        throw new Error('Error')
                    }
                    return user_auth
                }
            }
        }
    }
})

/**
 * @exports queries
 */
module.exports = new queries()