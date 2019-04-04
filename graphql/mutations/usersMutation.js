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
var typeUser = require('../types/users')
var modelUser = require('../../model/schema')
const jsonwebtoken = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var yup = require('yup')
var saltRounds = 10;


/*
create a signup APIs for using graphql
*/
exports.signup = {
    type: typeUser.userType,
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
    resolve(root, params) {
        /*
        for bcrypt password
        */
        params.password = bcrypt.hashSync(params.password, saltRounds)
        const usersMdl = new modelUser(params)
        /*
        save in database
        */
        const uModel = usersMdl.save();
        if (!uModel) {
            throw new Error('!Error, please check it again');
        }
        return uModel
    }
}


/*
updated data APIs for using graphql
*/
exports.update = {
    type: typeUser.userType,
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
    resolve(root, params) {
        return modelUser.findByIdAndUpdate(
            params.id,
            { $set: { firstname: params.firstname } },
            { new: true }
        )
            .catch(err => new Error(err));
    }
}


/*
remove data APIs for using graphql
*/
exports.remove = {
    type: typeUser.userType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    /*
    params means arguments which we provided
    */
    resolve(root, params) {
        const removeduser = modelUser.findByIdAndRemove(params.id).exec();
        if (!removeduser) {
            throw new Error('Error')
        }
        return removeduser;
    }
}

/*
login APIs using graphql 
*/
exports.login = {
    type: typeUser.userType,
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
    resolve(root, params) {
        const usersMdl = new modelUser(params)
        const user = usersMdl.find({ params.email : args.email })

        if (!user) {
            throw new Error('No user with that email')
        }
        const valid =  bcrypt.compare(params.password : args.password)
        if (!valid) {
            throw new Error('Incorrect password')
        }
        /*
         return json web token
        */
        return jsonwebtoken.sign({ email: params.email }, 'somesecret', { expiresIn: '2h' })
    }

}

