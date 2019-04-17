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

/**
@exports files
*/
module.exports = {
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
  createNote
}