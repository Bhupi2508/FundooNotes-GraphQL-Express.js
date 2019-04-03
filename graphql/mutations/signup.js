/******************************************************************************
 *  Execution       : default node          : cmd> add.js
 *                      
 * 
 *  Purpose         : added or create a new files
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
var bcrypt = require('bcrypt')
var saltRounds = 10;

/*
create a signup function
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
        const uModel = usersMdl.save();
        if (!uModel) {
            throw new Error('!Error, please check it again');
        }
        return uModel
    }


}