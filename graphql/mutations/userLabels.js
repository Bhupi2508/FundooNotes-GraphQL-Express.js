/********************************************************************************************************************
 *  Execution       : default node          : cmd> userLabels.js
 *                      
 * 
 *  Purpose         : perform operations by using userLabels
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


/********************************************************************************************************************
 *  Execution       : default node          : cmd> userLabels.js
 *                      
 * 
 *  Purpose         : create a new label
 * 
 *  @description    : create a labels APIs using graphql 
 * 
 *  @overview       : fundoo application 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 13-april-2019
 *
 *******************************************************************************************************************/
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
            if (!payload) {
                return { "message": "token is not verify" }
            }
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

/********************************************************************************************************************
 *  Execution       : default node          : cmd> userLabels.js
 *                      
 * 
 *  Purpose         : edit label which is already present in database
 * 
 *  @description    : updated a label APIs using graphql 
 * 
 *  @overview       : fundoo application 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 13-april-2019
 *
 *******************************************************************************************************************/
exports.editLabel = {
    type: authUser,
    args: {
        labelID: {
            type: GraphQLID
        },
        editlabelName: {
            type: GraphQLString
        }
    },

    async resolve(root, params, context) {
        try {
            /*
            find id from users models
            */
            var model = await labelModel.findOneAndUpdate({ _id: params.labelID },
                {
                    $set: {
                        labelName: params.editlabelName
                    }
                })

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


/********************************************************************************************************************
 *  Execution       : default node          : cmd> userLabels.js
 *                      
 * 
 *  Purpose         : remove label which is already present in database
 * 
 *  @description    : remove a label APIs using graphql 
 * 
 *  @overview       : fundoo application 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 13-april-2019
 *
 *******************************************************************************************************************/