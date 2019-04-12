/******************************************************************************
 *  Execution       : default node          : cmd> users.js
 *                      
 * 
 *  Purpose         : Generate a schema
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
/*
required files
*/
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')

/*
Design a schema for users
*/
exports.userType = new GraphQLObjectType({
    name: 'users',
    description: 'GraphQL',
    fields: function () {
        return {
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

/*
define a another schema for return Message and token
*/
exports.authType = new GraphQLObjectType({
    name: 'Auth',
    description: 'GraphQL',
    fields: function () {
        return {
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