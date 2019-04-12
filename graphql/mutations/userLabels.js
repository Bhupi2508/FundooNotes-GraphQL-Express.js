/********************************************************************************************************************
 *  Execution       : default node          : cmd> userLabels.js
 *                      
 * 
 *  Purpose         : store the information about notes in labels
 * 
 *  @description    : create a labels APIs using graphql 
 * 
 *  @overview       : fundoo application 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 11-april-2019
 *
 *******************************************************************************************************************/
/*
required files
*/
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var authUser = require('../types/users').authType
var userModel = require('../../model/schema')

exports.createLabel = {
    type: authUser,
    args: {
        labelName: {
            type: GraphQLString
        }
    },

    async resolve(root, params) {
        try {

            /*
             Name validation
            */
            if (params.labelName.length < 3) {
                return { "message": "Enter name more than 3 letters " }
            }

            /*
            find id from users models
            */
            const labelModel = new userModel(params)
            const label = labelModel.save()
            if (!label) {
                return { "message": "label is not created" }
            } else {
                return { "message": "Label created" }
            }
        } catch (error) {
            console.log("error")
        }
    }
}