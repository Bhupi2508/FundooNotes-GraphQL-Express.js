/******************************************************************************
 *  Execution       : default node          : cmd> mutation.js
 *                      
 * 
 *  Purpose         : Modified
 * 
 *  @description    : mutations are used to modified in these files
 * 
 *  @overview       : Create APIs using graphql 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 02-april-2019
 *
 ******************************************************************************/
/*
required files
*/
var addUser = require('./signup').signup;
var removeUser = require('./remove').remove;
var updateUser = require('./updated').update;

module.exports = {
  addUser,
  removeUser,
  updateUser
}