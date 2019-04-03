/******************************************************************************
 *  Execution       : default node          : cmd> remove.js
 *                      
 * 
 *  Purpose         : remove files from the collection
 * 
 *  @description    : By mutation create a new files
 * 
 *  @overview       : Create APIs using graphql 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 03-april-2019
 *
 ******************************************************************************/
/*
required files
*/
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/users');
var UserModel = require('../../model/schema');

exports.remove = {
    type: UserType.userType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },

    resolve(root, params) {
        const removeduser = UserModel.findByIdAndRemove(params.id).exec();
        if (!removeduser) {
            throw new Error('Error')
        }
        return removeduser;
    }
}