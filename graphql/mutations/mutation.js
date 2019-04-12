/******************************************************************************
 *  Execution       : default node          : cmd> mutation.js
 *                      
 * 
 *  Purpose         : Modified
 * 
 *  @description    : mutations are used to modified in these files
 * 
 *  @overview       : fundoo application 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 02-april-2019
 *
 ******************************************************************************/
/*
required files
*/
var signupUser = require('./usersMutation').signup;
var removeUser = require('./usersMutation').remove;
var updateUser = require('./usersMutation').update;
var loginUser = require('./usersMutation').login;
var forgotPasswordUser = require('./usersMutation').forgotPassword;
var resetPasswordUser = require('./usersMutation').resetPassword
var emailVerify = require('../mutations/usersMutation').emailVerify
var createLabel = require('../mutations/userLabels').createLabel

module.exports = {
  signupUser,
  removeUser,
  updateUser,
  loginUser,
  forgotPasswordUser,
  resetPasswordUser,
  emailVerify,
  createLabel
}