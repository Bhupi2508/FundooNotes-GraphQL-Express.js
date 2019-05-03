/******************************************************************************
 *  @Execution      : default node          : cmd> mutation.js
 *                      
 * 
 *  @Purpose        : Modified and exports all the mutation function
 * 
 *  @description    : mutations are used to modified in these files
 * 
 *  @overview       : fundoo application 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 13-april-2019
 *
 ******************************************************************************/
/**
 * @requires files
 */
const { GraphQLObjectType } = require('graphql')
var signupUser = require('./usersMutation').signup; //signup mutation
var removeUser = require('./usersMutation').remove; //remove mutation
var updateUser = require('./usersMutation').update; //update mutation
var loginUser = require('./usersMutation').login;   //login mutation
var forgotPasswordUser = require('./usersMutation').forgotPassword;  //forgotPassword mutation
var resetPasswordUser = require('./usersMutation').resetPassword  //resetPassword mutation
var emailVerify = require('../mutations/usersMutation').emailVerify  //emailVerify mutation
var createLabel = require('../mutations/userLabels').createLabel  //createLabel mutation
var editLabel = require('../mutations/userLabels').editLabel   //editLabel mutation
var removeLabel = require('../mutations/userLabels').removeLabel   //removeLabel mutation
var createNote = require('../mutations/userNotes').createNote   //createNote mutation
var editNote = require('../mutations/userNotes').editNote  //editNote mutation
var removeNote = require('../mutations/userNotes').removeNote   //removeNote mutation
var Reminder = require('../mutations/userNotes').Reminder  //addReminder mutation
var deleteReminder = require('../mutations/userNotes').deleteReminder  //deleteReminder mutation
var Archieve = require('../mutations/userNotes').Archieve   //Archieve mutation
var Trash = require('../mutations/userNotes').Trash   //Trash mutation
var savelabelonNote = require('../mutations/userNotes').saveLabelToNote  //savelabelonNote mutation
var DeletelabelFromNote = require('../mutations/userNotes').removeLabelFromNote  //savelabelonNote mutation
var gitAuthSocial = require('../mutations/gitAuthMutation').GithubAuth  //GithubAuth mutation
var codeVerify = require('../mutations/gitAuthMutation').codeVerify  //codeVerify mutation
var pullGitRepository = require('../mutations/gitAuthMutation').pullGitRepository    //pullGitRepository mutation
var gitAuthTokenVerify = require('../mutations/gitAuthMutation').GitAuthTokenVerify //GitAuthTokenVerify mutation
var uploadPic = require('../mutations/uploadPic').picUpload //picUpload mutation

/**
@exports files
*/
module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signupUser,
    removeUser,
    updateUser,
    loginUser,
    forgotPasswordUser,
    resetPasswordUser,
    emailVerify,
    createLabel,
    editLabel,
    removeLabel,
    createNote,
    editNote,
    removeNote,
    Reminder,
    deleteReminder,
    Archieve,
    Trash,
    savelabelonNote,
    DeletelabelFromNote,
    gitAuthSocial,
    codeVerify,
    pullGitRepository,
    gitAuthTokenVerify,
    uploadPic

  }
})