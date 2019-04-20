/********************************************************************************************************************
 *  @Execution      : default node          : cmd> gitAuth.js
 *                      
 * 
 *  @Purpose        : perform operations by using gitHub server
 * 
 *  @description    : By mutation give path for github server a new files
 * 
 *  @overview       : fundoo application  
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 20-april-2019
 *
 *******************************************************************************************************************/
/**
 * @requires files
 */
const {GraphQLNonNull, GraphQLString} = require('graphql')
var gitAuthType = require('../types/gitAuthType').gitauthType
var sendMail = require('../../sendMailer/sendMail')

//create a empty function
var gitAuthMutation = function () { }


gitAuthMutation.prototype.GithubAuth = {
    type: gitAuthType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },

    /**
     * @param {*} root 
     * @param {*} params 
     */
    async resolve(root, params) {
        try {

            // var clientID = process.env.GITHUB_CLIENT_ID,
            // var clientSecret = process.env.GITHUB_CLIENT_SECRET,
            // var callbackURL = process.env.Git_Link

            var url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.Git_Link}`

            sendMail.sendEmailFunction(url, params.email)


        } catch (err) {
            console.log("!Error")
        }
    }
}
/**
* @exports gitAuthMutation
*/
module.exports = new gitAuthMutation()