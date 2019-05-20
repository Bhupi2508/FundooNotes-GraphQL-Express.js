/******************************************************************************
 *  @Execution      : default node          : cmd> users.js
 *                      
 * 
 *  @Purpose        : Generate a schema
 * 
 *  @description    : design GraphQL user schema to specify the types for API using 
 *                    GraphQL schema language
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
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql')
var labelType = require('../types/labelType').labelauthType
var noteType = require('../types/noteTypes').noteAuthType
var labelModel = require('../../model/labelSchema')
var noteModel = require('../../model/noteSchema')


/**
 * @exports userType
 * @purpose : users schema for fetch data from database
 * @returns {Parameters}, which has property about schema
 */
exports.userType = new GraphQLObjectType({
    name: 'users',
    description: 'GraphQL',
    fields: function () {
        return {
            /**
             * @param {number} id
             * @param {String} firstname
             * @param {String} lastname
             * @param {String} email
             * @param {String} password
             */
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            firstname: {
                type: new GraphQLNonNull(GraphQLString)
            },
            lastname: {
                type: new GraphQLNonNull(GraphQLString)
            },
            email: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: new GraphQLNonNull(GraphQLString)
            },
            uploadURL: {
                type: new GraphQLNonNull(GraphQLString)
            },
            Key: {
                type: new GraphQLNonNull(GraphQLID)
            },
            labels: {
                type: new GraphQLList(labelType),  //find labels details also 
                resolve: async function (root, args) {
                    const users_label = await labelModel.find({ "userID": root.id })
                    if (!users_label) {
                        return { "message": "Id not found" }
                    }
                    return users_label
                }
            },
            notes: {
                type: new GraphQLList(noteType),
                args: {
                    title: {
                        type: GraphQLString
                    }
                },
                //find notes details also 
                resolve: async function (root, args) {
                    var regex1 = new RegExp(args.title)
                    const users_note = await noteModel.find({ "userID": root.id, title: regex1 })
                    if (!users_note) {
                        return { "message": "Id not found" }
                    }
                    return users_note
                },
            }
        }
    }
});


/**
 * @exports authType
 * @purpose : users schema for fetch data from database
 * @returns {Parameters}, which has property about schema, and pass message and token, id
 */
exports.authType = new GraphQLObjectType({
    name: 'Auth',
    description: 'GraphQL',
    fields: function () {
        return {
            /**
             * @param {number} id
             * @param {String} token
             * @param {String} message
             */
            token: {
                type: new GraphQLNonNull(GraphQLID)
            },
            message: {
                type: GraphQLString
            },
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }

        }
    }
});