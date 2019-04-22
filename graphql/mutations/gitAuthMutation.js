/********************************************************************************************************************
 *  @Execution      : default node          : cmd> gitAuth.js
 *                      
 * 
 *  @Purpose        : socail OAuth login for github by graphql 
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
const { GraphQLNonNull, GraphQLString } = require('graphql')
var gitAuthType = require('../types/users').authType
var sendMail = require('../../sendMailer/sendMail')
var model = require('../../model/schema')
var request = require('request')
var axios = require('axios')

//create a empty function
var gitAuthMutation = function () { }

/*******************************************************************************************************************/
/**
 * @description : social auth2.0 for github login using graphql
 * @purpose : For fetch data by using CURD operation
 */
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

            /**
             * @param {String}, create a code, which is redirect in graphiql
             * @returns {String} message
             */
            var url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.Git_Link}`

            //sent mail to the mail id
            var mail = sendMail.sendEmailFunction(url, params.email)
            if (!mail) {
                return { "message": "mail not sent" }
            }
            return { "message": "Mail sent to your mail ID" }

        } catch (err) {
            console.log("!Error")
        }
    }
}


/*******************************************************************************************************************/
/**
 * @description : code verify for auth2.0 for github login using graphql
 * @purpose : For fetch data by using CURD operation
 */
gitAuthMutation.prototype.codeVerify = {
    type: gitAuthType,

    /**
     * @param {*} root 
     */
    async resolve(root, params, context) {
        try {

            /**
             * @param {String}, post a url and then response will given token
             * @headers : application/json
             * @function getToken, has token
             */
            axios({
                method: 'post',
                url: `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${context.code}`,
                headers: {
                    accept: 'application/json',
                }
            }).then(response => {

                // Once we get the response, extract the access token from
                const access_token = response.data.access_token

                //function for access token
                getToken(access_token)
                console.log("Access token : ", access_token)
            })
                .catch(error => {
                    console.log(error)
                })


            /**
             * @param {*} access_token 
             * @headers : application/json
             */
            function getToken(access_token) {
                axios({
                    method: 'get',
                    url: `https://api.github.com/user?access_token=${access_token}`,
                    headers: {
                        accept: 'application/json',
                    }
                })
                    .then(async response => {
                        console.log("\nResponse.Data : \n", response.data)

                        //save those data in user database
                        var gituser = new model({
                            isGitVerify: true,
                            loginName: response.data.login,
                            gitID: response.data.id
                        });

                        saveuser = await gituser.save();
                        console.log(saveuser)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
            if (!saveuser) {
                return { "message": "data not save successfully" }
            }
            return { "message": "Data save successfully" }
        }
        catch (err) {
            console.log("!Error")
        }
    }
}



/**
* @exports gitAuthMutation
*/
module.exports = new gitAuthMutation()