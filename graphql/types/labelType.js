/******************************************************************************
 *  @Execution      : default node          : cmd> labelType.js
 *                      
 * 
 *  @Purpose        : create a type for query purpose 
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
/**
 * @requires files
 */
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')



/**
 * @purpose : labelUsers schema for fetch data from database
 * @exports authType
 * @field function{}
 * @returns {Parameters}
 */
exports.labelauthType = new GraphQLObjectType({  //authType return some variable which print given response
    name: 'labelAuth',
    description: 'GraphQL',
    fields: function () {
        return {
            /**
             * @param {token} token
             * @param {String} message
             * @param {number} id
             * @param {String} labelName
             */
            token: {
                type: new GraphQLNonNull(GraphQLID)
            },
            message: {
                type: GraphQLString
            },
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            labelName: {
                type: GraphQLString
            },
        }
    }
});