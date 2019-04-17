/********************************************************************************************************************
 *  @Execution      : default node          : cmd> userLabels.js
 *                      
 * 
 *  @Purpose        : perform operations by using userLabels
 * 
 *  @description    : create a labels APIs using graphql 
 * 
 *  @overview       : fundoo application 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 11-april-2019
 *
 *******************************************************************************************************************/
/**
 * @requires files
 */
const { GraphQLString, GraphQLID } = require('graphql');
var authUser = require('../types/labelType').labelauthType
var labelModel = require('../../model/labelSchema')
var tokenVerify = require('../../Authentication/authenticationUser')

//create a empty function
var labelMutation = function(){}

/*******************************************************************************************************************/
/**
@description : create a APIs for add lebel for using graphql
@purpose : For fetch data by using CURD operation 
@exports createLabel
*/
labelMutation.prototype.createLabel = {
    type: authUser,
    args: {

        /**
         * @param {String} labelName
         */
        labelName: {
            type: GraphQLString
        }
    },

    /**
    @param {token}, context have token from headers
    @param {String}, labelName 
    @param {params} params
    */
    async resolve(root, params, context) {
        try {

            /**
             * @param {number} Name validation 
             */
            if (params.labelName.length < 4) {
                return { "message": "Enter name min 4 letter " }
            }

            /**
             * @payload send token for verification
             * @condition if present or not
             */
            var payload = tokenVerify.verification(context.token)
            if (!payload) {
                return { "message": "token is not verify" }
            }
            var labelfind = await labelModel.find({ labelName: params.labelName })

            /**
            @param {number} label.length, check the label name already present or not
            */
            if (labelfind.length > 0) {
                return { "message": "labelName already present" }
            }

            //find id from users models
            const model = new labelModel({ labelName: params.labelName, userID: payload.userID })
            const label = model.save()

            /**
             * @return {String}, message
             */
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

/*******************************************************************************************************************/
/**
@description : update a APIs for edit lebel for using graphql
@purpose : For fetch data by using CURD operation
@exports editLabel
*/
labelMutation.prototype.editLabel = {
    type: authUser,
    args: {

        /**
         * @param {number} labelID
         * @param {String} editlabelName
         */
        labelID: {
            type: GraphQLID
        },
        editlabelName: {
            type: GraphQLString
        }
    },

    /**
     * @param {token}
     * @purpose : update name from database
     * @param {params} params
     */
    async resolve(root, params, context) {
        try {

            /**
             * @payload send token for verification
             * @condition if present or not
             */
            var payload = tokenVerify.verification(context.token)
            if (!payload) {
                return { "message": "token is not verify" }
            }

            //find id from users models
            var model = await labelModel.findOneAndUpdate({ _id: params.labelID },
                {
                    $set: {
                        labelName: params.editlabelName
                    }
                })

            /**
             * @return {String} message
             */
            if (!model) {
                return { "message": "label is not updated" }
            } else {
                return { "message": "Label updated" }
            }


        } catch (error) {
            console.log("error")
        }
    }
}


/*******************************************************************************************************************/
/**
@description : remove APIs for remove label for using graphql
@purpose : For fetch data by using CURD operation
@exports removeLabel
*/
labelMutation.prototype.removeLabel = {
    type: authUser,
    args: {

        /**
         * @param {number} labelID
         */
        labelID: {
            type: GraphQLID
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
             * @payload send token for verification
             * @condition if present or not
             */
            var payload = tokenVerify.verification(context.token)
            if (!payload) {
                return { "message": "token is not verify" }
            }

            /**
             * @purpose : find id from database then remove from dataase
             * @param {String} id
             * @returns {String} message
             */
            var model = await labelModel.findOneAndRemove({ _id: params.labelID })
            if (!model) {
                return { "message": "label is already removed" }
            } else {
                return { "message": "Label removed" }
            }


        } catch (error) {
            console.log("error")
        }
    }
}

/**
 * @exports labelMutation
 */
module.exports = new labelMutation()