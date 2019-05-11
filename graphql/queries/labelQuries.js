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
const { GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
var labelType = require('../types/labelType').labelauthType
var userType = require('../types/users').userType
var noteType = require('../types/noteTypes').noteAuthType
var labelModel = require('../../model/labelSchema')
var userModel = require('../../model/schema')
const redis = require("async-redis");
const client = redis.createClient()


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
                async labels(root, params, context) {
                    var labels = await client.get('labels' + root._id)
                    if (labels) {
                        var value = JSON.parse(labels)
                        return value
                    }
                    else {
                        var labels = await labelModel.find({ userID: root._id })
                        return labels
                    }
                }
            },

            /**
             * @returns {users}, for users function
             * @function resolvers
             * @returns {user_s}
             */
            users: {
                type: new GraphQLList(userType),
                args: {
                    userID: {
                        type: GraphQLString
                    },
                    first: {
                        type: GraphQLInt
                    },
                    offset: {
                        type: GraphQLInt
                    }
                },
                resolve: async function (root, args) {
                    const user_s = (await userModel.find().limit(params.first).skip(params.offset) || await userModel.find({ "_id ": args.userID }).limit(params.first).skip(params.offset))
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
                    },
                    first: {
                        type: GraphQLInt
                    },
                    offset: {
                        type: GraphQLInt
                    }
                },
                resolve: async function (root, args) {
                    const users_note = await userModel.find({ "userID": args.userID }).limit(params.first).skip(params.offset)
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
                args: {
                    first: {
                        type: GraphQLInt
                    },
                    offset: {
                        type: GraphQLInt
                    }
                },
                resolve: async function () {
                    const user_auth = await userModel.find().limit(params.first).skip(params.offset)
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