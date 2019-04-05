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
var yup = require('yup')
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
        return await userModel.findByIdAndUpdate(
            params.id,
            { $set: { firstname: params.firstname } },
            { new: true }
        )
            .catch(err => new Error(err));
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
        const removeduser = await userModel.findByIdAndRemove(params.id).exec();
        if (!removeduser) {
            throw new Error('Error')
        }
        return removeduser;
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
        if (!user) {
            return { "message": "unauthonticate email" }
        }

        /*
        compare password that is present in database or not
        */
        const valid = await bcrypt.compare(params.password, user[0].password)
        if (!valid) {
            return { "message": "unauthonticate password" }
        }

        /*
        generate a token with expire time and provide a secret key
        */
        var secret = "sfdaag645654rfgfgds"
        var token = jsonwebtoken.sign({ email: params.email }, secret, { expiresIn: 86400000 })

        return {
            "token": token,
            "message": "!Login....Successfully"
        }

    }
}
