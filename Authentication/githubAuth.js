/********************************************************************************************************************
 *  @Execution      : default node          : cmd> githubAuth.js
 *                      
 * 
 *  @Purpose        : for github jwt authentication 
 * 
 *  @description    : OAuth2.0 gor github login by using graphql 
 * 
 *  @overview       : fundoo application 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 18-april-2019
 *
 *******************************************************************************************************************/
/**
 * @requires files
 */

//pass the github information
exports.ids = ({
    github: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.Git_Link}`
    }
})
