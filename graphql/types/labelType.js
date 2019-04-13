/******************************************************************************
 *  Execution       : default node          : cmd> labelType.js
 *                      
 * 
 *  Purpose         : create a type for query purpose 
 * 
 *  @description    : Design GraphQL label schema to specify the types for API using 
 *                    GraphQL schema language
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
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')


/*
define a another schema for return Message, token and id
*/
exports.authType = new GraphQLObjectType({
    name: 'labelAuth',
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