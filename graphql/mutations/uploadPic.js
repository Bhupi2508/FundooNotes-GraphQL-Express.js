/********************************************************************************************************************
 *  @Execution      : default node          : cmd> uploadPic.js
 *                      
 * 
 *  @Purpose        : upload pic on s3-aws storage using graphql 
 * 
 *  @description    : By mutation upload a pic on AWS-s3
 * 
 *  @overview       : fundoo application  
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 27-april-2019
 *
 *******************************************************************************************************************/
/**
 * @requires files
 */
var type = require('../types//users').userType
const { GraphQLString } = require('graphql')
var userModel = require('../../model/schema');
var verifyToken = require('../../Authentication/authenticationUser')

//create a empty function
var uploadPicMutation = function () { }


uploadPicMutation.prototype.picUpload = {
    type: type,

    async resolve(parent, args, context) {
        if (context.token) {

            //verify token 
            var afterVerify = verifyToken.verification(context.token)
            if (!afterVerify > 0) {
                return { "message": "token is not verify" }
            }
            console.log(context.req.file.location)
            //find in database and then update
            var updateurl = await userModel.findOneAndUpdate({ _id: afterVerify.userID }, { $set: { ProfilePicUrl: context.req.file.location } })
            if (updateurl) {
                return {
                    "uploadURL": context.req.file.location,
                    "message": "Upload pic successfully"
                }
            }
        }
        else {
            return { "uploadURL": "profile Pic is not set" }
        }
    }
}


/**
* @exports uploadPicMutation
*/
module.exports = new uploadPicMutation()