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
const { GraphQLString, GraphQLID } = require('graphql');
var authUser = require('../types/labelType').authType
var labelModel = require('../../model/labelSchema')
var tokenVerify = require('../../Authentication/authenticationUser')

exports.createLabel = {
    type: authUser,
    args: {
        labelName: {
            type: GraphQLString
        }
    },

    async resolve(root, params, context) {
        try {

            /*
             Name validation
            */
            if (params.labelName.length < 4) {
                return { "message": "Enter name min 4 letter " }
            }

            /*
            for token verification
            */
            var payload = tokenVerify.verification(context.token)
            var labelfind = await labelModel.find({ labelName: params.labelName })

            /*
            check the label name already present or not
            */
            if (labelfind.length > 0) {
                return { "message": "labelName already present" }
            }
            /*
            find id from users models
            */
            const model = new labelModel({ labelName: params.labelName, userID: payload.userID })
            const label = model.save()
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