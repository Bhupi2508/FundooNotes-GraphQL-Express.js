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
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')


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