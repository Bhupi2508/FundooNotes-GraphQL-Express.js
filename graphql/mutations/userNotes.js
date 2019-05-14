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
const { GraphQLDateTime } = require('graphql-iso-date')
var noteAuthUser = require('../types/noteTypes').noteAuthType
var noteModel = require('../../model/noteSchema')
var labelModel = require('../../model/labelSchema')
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
                return { "message": "Enter title length min 3 letter " }
            }
            if (params.description.length < 4) {
                return { "message": "Enter description length min 4 letter " }
            }


            /**
             * @payload send token for verification
             * @condition if present or not
             * @returns {String} message
             */
            var payload = tokenVerify.verification(context.token)
            if (!payload) {
                return { "message": "token is not verify" }
            }


            //find title from database
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
            console.log("error in catch")
            return { "message": err }
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
    async resolve(root, params) {
        try {

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
            return { "message": err }
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
     */
    async resolve(root, params) {
        try {

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
            return { "message": err }
        }
    }
}



/*******************************************************************************************************************/
/**
 * @description : save label into notes APIs for updated notes for using graphql
 * @purpose : For fetch data by using CURD operation
 */
noteMutation.prototype.saveLabelToNote = {
    type: noteAuthUser,
    args: {

        /**
         * @param {String} noteID  
         * @param {String} label_ID 

        */

        noteID: {
            type: GraphQLString
        },
        label_ID: {
            type: GraphQLString
        }
    },

    /**
     * 
     * @param {*} root 
     * @param {*} params 
     */
    async resolve(root, params) {
        try {

            //find labelID from noteModel Schema
            var id = await noteModel.find({ "labelID": params.label_ID })

            //if id is already present
            if (id.length > 0) {
                return { "message": "This label is already added in note" }
            }

            //find id from noteModel and update(push) into notes
            var note = await noteModel.findOneAndUpdate({ _id: params.noteID },
                {
                    $push: {
                        labelID: params.label_ID
                    }
                })

            /**
             * @return {String}, message
             */
            if (!note) {
                return { "message": "label not added " }
            } else {
                return { "message": "label added on note successfully " }
            }

        } catch (error) {
            console.log("error in catch")
            return { "message": err }
        }
    }
}



/*******************************************************************************************************************/
/**
 * @description : save label into notes APIs for updated notes for using graphql
 * @purpose : For fetch data by using CURD operation
 */
noteMutation.prototype.removeLabelFromNote = {
    type: noteAuthUser,
    args: {

        /**
         * @param {String} noteID  
         * @param {String} label_ID 

        */

        noteID: {
            type: GraphQLString
        },
        label_ID: {
            type: GraphQLString
        }
    },

    /**
     * 
     * @param {*} root 
     * @param {*} params 
     */
    async resolve(root, params) {
        try {

            //find labelID from noteModel Schema
            var id = await noteModel.find({ "labelID": params.label_ID })

            //if id is already present
            if (!id.length > 0) {
                return { "message": "This label is not present in notes" }
            }

            //find id from noteModel and update(push) into notes
            var note = await noteModel.findOneAndUpdate({ _id: params.noteID },
                {
                    $pull: {
                        labelID: params.label_ID
                    }
                })

            /**
             * @return {String}, message
             */
            if (!note) {
                return { "message": "label not deleted " }
            } else {
                for (let i = 0; i < (note.labelID).length; i++) {
                    if (note.labelID[i] === params.label_ID) {
                        note.labelID.splice(i, 1);
                    }
                }
                return { "message": "label delete from note successfully " }
            }


        } catch (error) {
            console.log("error in catch")
            return { "message": err }
        }
    }
}


/*******************************************************************************************************************/
/**
 * @description : save label into notes APIs for updated notes for using graphql
 * @purpose : For fetch data by using CURD operation
 */
noteMutation.prototype.Reminder = {
    type: noteAuthUser,
    args: {

        /**
         * @param {String} DateTime  
         * @param {String} label_ID 

        */
        noteID: {
            type: GraphQLID
        },
        reminder: {
            type: GraphQLString
        }
    },

    /**
     * 
     * @param {*} root 
     * @param {*} params 
     */
    async resolve(root, params) {
        try {

            //find labelID from noteModel Schema
            var id = await noteModel.find({ "_id": params.noteID })

            //if id is already present
            if (!id.length > 0) {
                return { "message": "This noteID is not present in notes" }
            }

            var date = new Date(params.reminder)
            console.log(date)
            //find id from noteModel and update(push) into notes
            var note = await noteModel.findOneAndUpdate({ _id: params.noteID },
                {
                    $set: {
                        reminder: date
                    }
                })

            //time set for reminder time


            /**
         * @return {String}, message
         */
            if (!note) {
                return { "message": "reminder not set " }
            }
            return { "message": "reminder set in note successfully " }


        } catch (error) {
            console.log("error in catch")
            return { "message": err }
        }
    }
}


/*******************************************************************************************************************/
/**
 * @description : deleteReminder APIs from notes for using graphql
 * @purpose : For fetch data by using CURD operation
 */
noteMutation.prototype.deleteReminder = {
    type: noteAuthUser,
    args: {

        /**
         * @param {String} label_ID 
        */
        noteID: {
            type: GraphQLID
        }
    },

    /**
     * 
     * @param {*} root 
     * @param {*} params 
     */
    async resolve(root, params) {
        try {

            //find labelID from noteModel Schema
            var id = await noteModel.find({ "_id": params.noteID })

            //if id is already present
            if (!id.length > 0) {
                return { "message": "This noteID is not present in notes" }
            }

            //find id from noteModel and update(push) into notes
            var note = await noteModel.findOneAndRemove({ _id: params.noteID }, { reminder })

            /**
             * @return {String}, message
             */
            if (!note) {
                return { "message": "reminder not remove " }
            }
            return { "message": "reminder remove successfully " }


        } catch (error) {
            console.log("error in catch")
            return { "message": err }
        }
    }
}






/*******************************************************************************************************************/
/**
 * @description : Archieve data APIs check whether is archieve or not for using apollo-graphql
 * @purpose : For fetch data by using CURD operation
 * @param {payload}, has token for verification and ID
 * @purpose : Archiev note from database
 * @param {params} params
 */
noteMutation.prototype.Archieve = {
    type: noteAuthUser,
    args: {

        /**  
         * @param {String} label_ID 
        */
        noteID: {
            type: GraphQLID
        }
    },

    /**
     * 
     * @param {*} root 
     * @param {*} params 
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

            //find that id id presen or not
            var checkNote = await noteModel.find({ _id: params.noteID })
            console.log(checkNote);


            //check whether is false or true in database
            if (checkNote[0].archieve == false) {

                /**
                 * @purpose : find id and then update archieve
                 * @param {ID}, userID
                 * @returns {String}, message
                 */
                var note = await noteModel.updateOne({ _id: params.noteID },
                    {
                        $set:
                        {
                            "archieve": true
                        }
                    })

                return { "message": "note Archieve" }
            }

            return { "message": "note already Archieve" }


        } catch (error) {
            console.log("error")
            return { "message": err }
        }
    }
}





/*******************************************************************************************************************/
/**
 * @description : Archieve data APIs check whether is archieve or not for using apollo-graphql
 * @purpose : For fetch data by using CURD operation
 * @param {payload}, has token for verification and ID
 * @purpose : Archiev note from database
 * @param {params} params
 */
noteMutation.prototype.ArchieveRemove = {
    type: noteAuthUser,
    args: {

        /**  
         * @param {String} label_ID 
        */
        noteID: {
            type: GraphQLID
        }
    },

    /**
     * 
     * @param {*} root 
     * @param {*} params 
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

            //find that id id presen or not
            var checkNote = await noteModel.find({ _id: params.noteID })

            //check whether is false or true in database
            if (checkNote[0].archieve == false) {

                return { "message": "This note is not Archieve" }

            } else {

                /**
                * @purpose : find id and then update archieve
                * @param {ID}, userID
                * @returns {String}, message
                */
                var note = await noteModel.updateOne({ _id: params.noteID },
                    {
                        $set:
                        {
                            "archieve": false
                        }
                    })

                return { "message": "note remove from Archieve" }
            }


        } catch (error) {
            console.log("error")
            return { "message": err }
        }
    }
}




/*******************************************************************************************************************/
/**
 * @description : Trash data APIs check whether is Trash/Delete or not for using apollo-graphql
 * @purpose : For fetch data by using CURD operation
 * @param {payload}, has token for verification and ID
 * @purpose : Trash note from database
 * @param {params} params
 */
noteMutation.prototype.Trash = {
    type: noteAuthUser,
    args: {

        /**  
         * @param {String} label_ID 
        */
        noteID: {
            type: GraphQLID
        }
    },

    /**
     * 
     * @param {*} root 
     * @param {*} params 
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

            //find that id id presen or not
            var checkNote = await noteModel.find({ _id: params.noteID })

            //check whether is false or true in database
            if (checkNote[0].trash == false) {


                /**
                 * @purpose : find id and then update archieve
                 * @param {ID}, userID
                 * @returns {String}, message
                 */
                var note = await noteModel.updateOne({ _id: params.noteID },
                    {
                        $set:
                        {
                            "trash": true
                        }
                    })

                return { "message": "note trash" }

            }

            return { "message": "This note is already in trash" }


        } catch (error) {
            console.log("error")
            return { "message": err }
        }
    }
}





/*******************************************************************************************************************/
/**
 * @description : Trash data APIs check whether is Trash/Delete or not for using apollo-graphql
 * @purpose : For fetch data by using CURD operation
 * @param {payload}, has token for verification and ID
 * @purpose : Trash note from database
 * @param {params} params
 */
noteMutation.prototype.TrashRemove = {
    type: noteAuthUser,
    args: {

        /**  
         * @param {String} label_ID 
        */
        noteID: {
            type: GraphQLID
        }
    },

    /**
     * 
     * @param {*} root 
     * @param {*} params 
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

            //find that id id presen or not
            var checkNote = await noteModel.find({ _id: params.noteID })

            //check whether is false or true in database
            if (checkNote[0].trash == false) {

                return { "message": "This not is not in trash" }

            } else {

                /**
                * @purpose : find id and then update archieve
                * @param {ID}, userID
                * @returns {String}, message
                */
                var note = await noteModel.updateOne({ _id: params.noteID },
                    {
                        $set:
                        {
                            "trash": false
                        }
                    })

                return { "message": "note remove from trash" }
            }


        } catch (error) {
            console.log("error")
            return { "message": err }
        }
    }
}





/**
 * @exports noteMutation
 */
module.exports = new noteMutation()