/********************************************************************************************************************
 *  @Execution      : default node          : cmd> userNotes.js
 *                      
 * 
 *  @Purpose        : perform operations by using users
 * 
 *  @description    : By using mutation create a new files and fetch the data
 * 
 *  @overview       : fundoo application  
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 16-april-2019
 *
 *******************************************************************************************************************/
/**
 * @requires files
 */
const { GraphQLString, GraphQLID } = require('graphql');
var noteAuthUser = require('../types/noteTypes').noteAuthType
var noteModel = require('../../model/noteSchema')
var tokenVerify = require('../../Authentication/authenticationUser')

//create a empty function
var noteMutation = function () { }

/*******************************************************************************************************************/
/**
 * @description : create a APIs for add notes for using graphql
 * @purpose : For fetch data by using CURD operation
 */
noteMutation.prototype.createNote = {
    type: noteAuthUser,
    args: {

        /**
         * @param {String} title  
         * @param {String} description 
         * @param {String} reminder  
         * @param {String} color 
         * @param {String} img
        */

        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        reminder: {
            type: GraphQLString
        },
        color: {
            type: GraphQLString
        },
        img: {
            type: GraphQLString
        }
    },

    /**
     * @param {*} root 
     * @param {*} params 
     * @param {*} context 
     */
    async resolve(root, params, context) {
        try {

            /**
             * @param {String} title validation 
             * @param {String} description validation
             */
            if (params.title.length < 3) {
                return { "message": "Enter name min 3 letter " }
            }
            if (params.description.length < 5) {
                return { "message": "Enter name min 3 letter " }
            }

            /**
             * @payload send token for verification
             * @condition if present or not
             */
            var payload = tokenVerify.verification(context.token)
            if (!payload) {
                return { "message": "token is not verify" }
            }
            var notefind = await noteModel.find({ title: params.title })

            /**
             * @param {number} notefind.length, check the label name already present or not
             * @returns {String} message
             */
            if (notefind.length > 0) {
                return { "message": "title already present" }
            }

            //find id from users models
            const model = new noteModel({
                title: params.title,
                description: params.description,
                reminder: params.reminder,
                color: params.color,
                img: params.img,
                userID: payload.userID
            })
            const note = model.save()

            /**
             * @return {String}, message
             */
            if (!note) {
                return { "message": "note is not created" }
            } else {
                return { "message": "note created" }
            }
        } catch (error) {
            console.log("error")
        }
    }
}


/*******************************************************************************************************************/
/**
 * @description : update data APIs for updated notes for using graphql
 * @purpose : For fetch data by using CURD operation
 */
noteMutation.prototype.editNote = {
    type: noteAuthUser,
    args: {

        /**
         * @param {number} labelID
         * @param {String} editlabelName
         */
        noteID: {
            type: GraphQLID
        },
        editTitle: {
            type: GraphQLString
        }
    },

    /**
     * @param {token}
     * @purpose : update title or description from database
     * @param {params} params
     */
    async resolve(root, params, context) {
        try {

            /**
             * @payload send token for verification
             * @condition if present or not
             * @returns {String} message
             */
            var payload = tokenVerify.verification(context.token)
            if (!payload) {
                return { "message": "token is not verify" }
            }

            //find id from users models
            var note = await noteModel.findOneAndUpdate({ _id: params.noteID },
                {
                    $set: {
                        title: params.editTitle
                    }
                })

            /**
             * @return {String} message
             */
            if (!note) {
                return { "message": "note is not updated" }
            } else {
                return { "message": "note updated" }
            }


        } catch (error) {
            console.log("error")
        }
    }
}


/*******************************************************************************************************************/
/**
@description : remove APIs for remove note for using graphql
@purpose : For fetch data by using CURD operation
*/
noteMutation.prototype.removeNote = {
    type: noteAuthUser,
    args: {

        /**
         * @param {number} noteID
         */
        noteID: {
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
             * @returns {String} message
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
            var note = await noteModel.findOneAndRemove({ _id: params.noteID })
            if (!note) {
                return { "message": "note is not present" }
            } else {
                return { "message": "note removed" }
            }


        } catch (error) {
            console.log("error")
        }
    }
}

/**
 * @exports noteMutation
 */
module.exports = new noteMutation()