/******************************************************************************
 *  @Execution      : default node          : cmd> noteType.js
 *                      
 * 
 *  @Purpose        : create a notetype for query purpose 
 * 
 *  @description    : Design GraphQL note schema to specify the types for API using 
 *                    GraphQL schema language
 * 
 *  @overview       : fundoo application 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 15-april-2019
 *
 ******************************************************************************/
/**
 * @requires files
 */
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLBoolean } = require('graphql')



/**
 * @purpose : labelUsers schema for fetch data from database
 * @exports authType
 * @field function{}
 * @returns {Parameters}
 */
exports.noteAuthType = new GraphQLObjectType({  //authType return some variable which print given response
    name: 'noteAuth',
    description: 'GraphQL',
    fields: function () {
        return {
            /**
             * @param {String} message
             * @param {number} id
             * @param {String} title  
             * @param {String} description 
             * @param {String} reminder  
             * @param {String} color 
             * @param {String} img
             * @param {String} archieve
             * @param {String} trash
             * @param {String} pin
             */
            message: {
                type: GraphQLString
            },
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            title: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            reminder: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            img: {
                type: GraphQLString
            },
            archieve: {
                type: GraphQLBoolean
            },
            trash: {
                type: GraphQLBoolean
            },
            pin: {
                type: GraphQLBoolean
            }
        }
    }
});