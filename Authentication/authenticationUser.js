/******************************************************************************
 *  Execution       : default node          : cmd> nodemon authenticationUser.js
 *                      
 * 
 *  Purpose         : verify the token 
 * 
 *  @description    : verify token for resetPassword
 * 
 *  @file           : fundoo application
 *  @overview       : Connect and chat with two peoples
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 21-mar-2019
 *
 ******************************************************************************/
/*
required files
*/

var jwt = require('jsonwebtoken');
exports.verification = (token) => {
    try {
        /*
        verify the token and then send response to sendMail
        */
        var value = jwt.verify(token, process.env.secretKey)
        return value
    }
    catch (err) {
        console.log("found error in generating token")
    }
}
