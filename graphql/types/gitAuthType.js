/******************************************************************************
 *  @Execution      : default node          : cmd> gitAuthType.js
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
 *  @since          : 20-april-2019
 *
 ******************************************************************************/
/**
 * @requires files
 */
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')



/**
 * @purpose : By using social auth schema for fetch data from database
 * @exports gitauthType
 * @field function{}
 * @returns {Parameters}
 */
exports.gitauthType = new GraphQLObjectType({  //authType return some variable which print given response
    name: 'gitAuth',
    description: 'GraphQL',
    fields: function () {
        return {
            /**
             * @param {String} message
             * @param {number} gitId
             */
            message: {
                type: GraphQLString
            },
            code: {
                type: new GraphQLNonNull(GraphQLID)
            },
        }
    }
});