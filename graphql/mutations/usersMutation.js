/********************************************************************************************************************
 *  @Execution       : default node          : cmd> userMutations.js
 *                      
 * 
 *  @Purpose         : perform operations by using users
 * 
 *  @description    : By mutation create a new files
 * 
 *  @overview       : fundoo application  
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 02-april-2019
 *
 *******************************************************************************************************************/
/**
 * @requires files
 */
var GraphQLNonNull = require('graphql').GraphQLNonNull;
const {GraphQLString, GraphQLID} = require('graphql')
var typeUser = require('../types/users').userType
var authUser = require('../types/users').authType
var userModel = require('../../model/schema')
const jsonwebtoken = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var sendMail = require('../../sendMailer/sendMail')
var tokenVerify = require('../../Authentication/authenticationUser')
var redis = require('redis')
var client = redis.createClient()
var saltRounds = 10;

//create a empty function
var userMutation = function(){}
/*******************************************************************************************************************/
/**
@description : register a APIs for register a new user using graphql
@purpose : For register a new data by using CURD operation
*/
userMutation.prototype.signup = {
    type: authUser,
    args: {

        /**
         * @param {String} firstname 
         * @param {String} lastname
         * @param {String} email
         * @param {String} password
         */
        firstname: {
            type: new GraphQLNonNull(GraphQLString),
        },
        lastname: {
            type: new GraphQLNonNull(GraphQLString),
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },

    /**
     * @param {*} params
     */
    async resolve(root, params) {
        try {
            
            //for email validation
            var emailformat = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

            if (!emailformat.test(params.email)) {
                return { "message": "not valid email", }
            }

            /**
             * @param {number}, password validation 
             */
            if (params.password.length < 8) {
                return { "message": "Enter pasword more than 8 letters " }
            }

            //for email id cheking
            verify = await userModel.find({ "email": params.email })
            if (verify.length > 0) {
                return { "message": "email already exists" }
            }

            //for bcrypt password
            params.password = await bcrypt.hashSync(params.password, saltRounds)
            const usersMdl = new userModel(params)

            //save in database
            const uModel = usersMdl.save();
            if (!uModel) {
                return { "message": "Register unsuccessfull" }
            } else {

                /**
                 * @param {token}, a token and send for verification
                 */
                var token = jsonwebtoken.sign({ email: params.email }, process.env.secretKey, { expiresIn: 86400000 })

                /**
                 * @purpose : redis cache, save data in ram
                 * @returns {String} message
                 */
                client.set('token', token)
                client.get('token', function (error, result) {

                    if (error) {
                        return { "message": "Redis cache cannot get result" }
                    }
                    // console.log('Get result from redis -> ' + result);
                });

                /**
                 * @param {token}, send token for verification to the mail
                 * @returns {String} message
                 */
                var url = `${process.env.link}${token}`
                sendMail.sendEmailFunction(url, params.email)
                return { "message": "Register successfull" }
            }
        } catch (err) {
            console.log("!Error")
        }
    }
}


/*******************************************************************************************************************/
/**
@description : emailverification APIs for verify a eamil that is valid or not using graphql
@purpose : For regisemailverification by using CURD operation
*/
userMutation.prototype.emailVerify = {
    type: authUser,
    async resolve(root, params, context) {
        try {

            /**
             * @param {token}, send token for verify
             * @returns {String} message, token verification
             */
            var afterVerify = tokenVerify.verification(context.token)
            if (!afterVerify > 0) {
                return { "message": "token is not verify" }
            }

            /**
             * @param {String} email
             * @returns {String} message
             * @param {$set}, for verification
             */
            var update = await userModel.updateOne({ "email": afterVerify.email },
                { $set: { verification: true } },
                { new: true })
            if (!update) {
                return { "message": "verification unsuccessfull" }
            }
            return { "message": "verification successfull" }

        } catch (err) {
            console.log("!Error")
        }

    }
}

/*******************************************************************************************************************/
/**
@description : update APIs for updateUser data using graphql
@purpose : For updation by using CURD operation
*/
userMutation.prototype.update = {
    type: typeUser,
    args: {

        /**
         * @param {number} id 
         * @param {String} firstname
         */
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        firstname: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },

    /**
     * 
     * @param {number} id 
     * @param {*} params 
     * @param {$set}, set given name in database
     * @returns {String} function{}
     */
    async resolve(root, params) {
        try {
            return await userModel.findByIdAndUpdate(
                params.id,
                { $set: { firstname: params.firstname } },
                { new: true }
            )
                .catch(err => new Error(err));
        } catch (err) {
            console.log("!Error")
        }
    }
}

/*******************************************************************************************************************/
/**
@description : REMOVE APIs for remove data from database using graphql
@purpose : For deletion by using CURD operation
*/
userMutation.prototype.remove = {
    type: typeUser,
    args: {

        /**
         * @param {number} id
         */
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },

    /**
     * @param {*} root 
     * @param {*} params
     * @returns {number} remove user id 
     */
    async resolve(root, params) {
        try {
            const removeduser = await userModel.findByIdAndRemove(params.id).exec();
            if (!removeduser) {
                throw new Error('Error')
            }
            return removeduser;
        } catch (err) {
            console.log("!Error")
        }
    }
}

/*******************************************************************************************************************/
/**
@description : Login APIs for login user using graphql
@purpose : For login new user by using CURD operation
*/
userMutation.prototype.login = {
    type: authUser,
    args: {

        /**
         * @param {String} email
         * @param {String} password
         */
        email: {
            type: new GraphQLNonNull(GraphQLString),
            required: true
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            required: true
        }
    },

    /**
     * 
     * @param {*} root 
     * @param {*} params 
     */
    async resolve(root, params) {
        try {
            var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            /**
             * @return {String} message
             */
            if (!emailformat.test(params.email)) {
                return { "message": "not valid email" }
            }

            //find email that is present in database or not
            user = await userModel.find({ "email": params.email })
            if (!user.length > 0) {
                return { "message": "email is not present" }
            }
            if (user[0].verification === false) {
                return { "message": "Email not verified" }
            }

            /**
             * @param {token}, generate a token with expire time and provide a secret key
             */
            var token = jsonwebtoken.sign({ email: params.email, userID: user[0].id }, process.env.secretKey, { expiresIn: 86400000 })

            //take id for current user from database
            var id = user[0].id

            //compare password that is present in database or not
            const valid = await bcrypt.compare(params.password, user[0].password)

            if (!valid) {
                return { "message": "unauthonticate password" }
            }

            /**
             * @return {token}
             * @return {number} id
             * @return {String} message
             */
            return {
                "token": token,
                "id": id,
                "message": "!Login....Successfully"
            }

        } catch (err) {
            console.log("!Error")
        }
    }
}


/*******************************************************************************************************************/
/**
@description : forgotPassword APIs for updatePassword user using graphql
@purpose : For deletion by using CURD operation
*/
userMutation.prototype.forgotPassword = {
    type: authUser,
    args: {

        /**
         * @param {String} email
         */
        email: {
            type: new GraphQLNonNull(GraphQLString),
            required: true
        }
    },

    /**
     * 
     * @param {*} root 
     * @param {*} params 
     */
    async resolve(root, params) {
        try {
            var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            /**
             * @purpose : check that email is valid or not
             * @return {String} message
             */
            if (!emailformat.test(params.email)) {
                return { "message": "not valid email" }
            }

            /**
             * @purpose : find email that is present in database or not
             * @return {String} message
             */
            user = await userModel.find({ "email": params.email })
            if (!user.length > 0) {
                return { "message": "email is not present in database" }
            }

            /**
             * @purpose : generate a token for send a mail
             */
            var token = jsonwebtoken.sign({ email: params.email }, process.env.secretKey, { expiresIn: 86400000 });

            //send token to sendmail function, which is send to the link(token)
            var url = `${process.env.link}${token}`

            /**
             * @param {token}, for sending mail to the mail
             * @returns {String} message
             */
            var mail = sendMail.sendEmailFunction(url, params.email)
            if (!mail > 0) {
                return { "mesage": "!Error, mail not send " }
            }
            return { "message": "Mail sent to your given email id" }

        } catch (err) {
            console.log("!Error")
        }

    }
}


/*******************************************************************************************************************/
/**
@description : resetPassword APIs for resetPassword user using graphql
@purpose : For resetPassword by using CURD operation
*/
userMutation.prototype.resetPassword = {
    type: authUser,
    args: {

        /**
         * @param {String} newPassword
         * @param {String} confirmPassword
         */
        newPassword: {
            type: new GraphQLNonNull(GraphQLString),
            required: true
        },
        confirmPassword: {
            type: new GraphQLNonNull(GraphQLString),
            required: true
        }
    },

    /**
     * 
     * @param {*} root 
     * @param {*} params 
     * @param {*} context 
     */
    async resolve(root, params, context) {
        try {

            /**
             * @purpose : for token verification
             * @returns {String} message
             */
            var afterVerify = tokenVerify.verification(context.token)
            if (!afterVerify > 0) {
                return { "message": "token is not verify" }
            }

            //password matching
            if (params.newPassword != params.confirmPassword) {
                return { "message": "password and confirm password are not match" }
            }

            //bcrypt new password
            params.newPassword = await bcrypt.hashSync(params.newPassword, saltRounds)

            /**
             * @purpose : for updated password
             * @param {String}, message
             * @param {$set}, new passowrd in database
             * @returns {String} message
             */
            var update = await userModel.updateOne({ "email": afterVerify.email },
                { $set: { password: params.newPassword } },
                { new: true })

            if (!update) {
                return { "message": "Password not reset" }
            }
            return { "message": "resetPassword Successfully" }

        } catch (err) {
            console.log("!Error")
        }
    }
}

/**
 * @exports userMutation
 */
module.exports = new userMutation()