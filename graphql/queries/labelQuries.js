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
var notesModel = require('../../model/noteSchema')
var userModel = require('../../model/schema')
var tokenVerify = require('../../Authentication/authenticationUser')
const redis = require("async-redis");
const client = redis.createClient({
    host:'redis',
    port:6379
})


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
                        var labels_ = await labelModel.find({ userID: root._id })
                        return labels_
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
                resolve: async function (root, args, context) {
                    if (!context.token) {
                        return {
                            "message": "token not provided"
                        }
                    }
                    var payload = tokenVerify.verification(context.token)
                    const user_s = await userModel.find({ _id: payload.userID }).limit(args.first).skip(args.offset)
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
                    const users_note = await userModel.find({ "userID": args.userID }).limit(args.first).skip(args.offset)
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
                resolve: async function (root, params) {
                    const user_auth = await userModel.find().limit(params.first).skip(params.offset)
                    if (!user_auth) {
                        throw new Error('Error')
                    }
                    return user_auth
                }
            },



            /**
             * @purpose : for searchNoteByTitle Query 
             * @param {args}
             * @param {context}
             */
            searchNoteByTitle: {
                type: new GraphQLList(noteType),
                args: {
                    first: {
                        type: GraphQLInt
                    },
                    offset: {
                        type: GraphQLInt
                    },
                    title: {
                        type: GraphQLString
                    }
                },
                resolve: async function (root, params) {
                    var regex1 = new RegExp(params.title)
                    var notes_User = await notesModel.find({ title: regex1 }).limit(params.first).skip(params.offset)
                    console.log("notes_user", notes_User[0]);
                    return notes_User
                }
            },



            /**
             * @purpose : for searchNoteByDescription Query 
             * @param {args}
             * @param {context}
             */
            searchNoteByDescription: {
                type: new GraphQLList(noteType),
                args: {
                    first: {
                        type: GraphQLInt
                    },
                    offset: {
                        type: GraphQLInt
                    },
                    description: {
                        type: GraphQLString
                    }
                },
                resolve: async function (root, params) {
                    var regex2 = new RegExp(params.description)
                    var notes_User = await notesModel.find({ description: regex2 }).limit(params.first).skip(params.offset)
                    console.log("notes_user", notes_User[0]);
                    return notes_User
                }

            }
        }
    }
})

/**
 * @exports queries
 */
module.exports = new queries()