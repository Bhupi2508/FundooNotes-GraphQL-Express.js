/******************************************************************************
 *  Execution       : default node          : cmd> userMutations.js
 *                      
 * 
 *  Purpose         : perform operations by using users
 * 
 *  @description    : By mutation create a new files
 * 
 *  @overview       : Create APIs using graphql 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 02-april-2019
 *
 ******************************************************************************/
/*
required files
*/
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var typeUser = require('../types/users').userType
var authUser = require('../types/users').authType
var userModel = require('../../model/schema')
const jsonwebtoken = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var sendMail = require('../../sendMailer/sendMail')
var tokenVerify = require('../../Authentication/authenticationUser')
var saltRounds = 10;

/*******************************************************************************************************************/
/*
create a signup APIs for using graphql
*/
exports.signup = {
    type: authUser,
    args: {
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
    async resolve(root, params) {
        try {
            /*
            for email validation
            */
            var emailformat = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

            if (!emailformat.test(params.email)) {
                return { "message": "not valid email", }
            }

            /*
            password validation
            */
            if (params.password.length < 6) {
                return { "message": "Enter pasword more than 6 letters " }
            }

            /*
            for email id cheking
            */
            verify = await userModel.find({ "email": params.email })
            console.log("verify", verify.length);
            if (verify.length > 0) {
                return { "message": "email already exists" }
            }

            /*
           for bcrypt password
           */
            params.password = await bcrypt.hashSync(params.password, saltRounds)
            const usersMdl = new userModel(params)

            /*
            save in database
            */
            const uModel = usersMdl.save();
            if (!uModel) {
                return { "message": "Register unsuccessfull" }
            } else {
                return { "message": "Register successfull" }
            }
        } catch (err) {
            console.log("!Error")
        }
    }
}

/*******************************************************************************************************************/
/*
updated data APIs for using graphql
*/
exports.update = {
    type: typeUser,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        firstname: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    /*
    passed argument in resolve
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
/*
remove data APIs for using graphql
*/
exports.remove = {
    type: typeUser,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    /*
    params means arguments which we provided
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
/*
login APIs using graphql 
*/
exports.login = {
    type: authUser,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
            required: true
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            required: true
        }
    },

    async resolve(root, params) {
        try {
            var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            /*
            email validations
            */
            if (!emailformat.test(params.email)) {
                return { "message": "not valid email" }
            }

            /*
            generate a token with expire time and provide a secret key
            */
            var token = jsonwebtoken.sign({ email: params.email }, process.env.secretKey, { expiresIn: 86400000 })

            /*
            find email that is present in database or not
            */
            user = await userModel.find({ "email": params.email })
            if (!user.length > 0) {
                return { "message": "email is not present" }
            }

            /*
            compare password that is present in database or not
            */
            const valid = await bcrypt.compare(params.password, user[0].password)
            if (!valid.length > 0) {
                return { "message": "unauthonticate password" }
            }
            return {
                "token": token,
                "message": "!Login....Successfully"
            }

        } catch (err) {
            console.log("!Error")
        }
    }
}


/*******************************************************************************************************************/
/*
forgotPassword APIs using graphql
*/
exports.forgotPassword = {
    type: authUser,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
            required: true
        }
    },

    async resolve(root, params) {
        try {
            var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            /*
            email validations
            */
            if (!emailformat.test(params.email)) {
                return { "message": "not valid email" }
            }

            /*
            find email that is present in database or not
            */
            user = await userModel.find({ "email": params.email })
            if (!user.length > 0) {
                return { "message": "email is not present in database" }
            }

            /*
            generate a token for send a mail
            */
            var token = jsonwebtoken.sign({ email: params.email }, process.env.secretKey, { expiresIn: 86400000 });

            /*
            send token to sendmail function, which is send to the link(token)
            */
            var url = `http://localhost:4000/#!/resetPassword/${token}`
            
            var mail = sendMail.sendEmailFunction(url)
            
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
/*
resetPassword APIs using graphql
*/
exports.resetPassword = {
    type: authUser,
    args: {
        newPassword: {
            type: new GraphQLNonNull(GraphQLString),
            required: true
        },
        confirmPassword: {
            type: new GraphQLNonNull(GraphQLString),
            required: true
        }
    },

    async resolve(root, params, context) {
        try {

            /*
            find email that is present in database or not
            */
            user = await userModel.find({ "email": params.email })
            if (!user.length > 0) {
                return { "message": "email is not present in database" }
            }

            var afterVerify = tokenVerify.verification()
            /*
            password matching
            */
            if (params.newPassword!= params.confirmPassword) {
               return { "message": "password and confirm password are not match" }
            }
             /*
                bcrypt new password
                */
               params.newPassword = await bcrypt.hashSync(params.newPassword, saltRounds)

               /*
               update new password
               */
               var update = await userModel.updateOne({ email: params.email }, { password: params.newPassword })
               if(!update.length>0){
                   return { "message": "Password not match" }
               }

        } catch (err) {
            console.log("!Error")
        }
    }
}