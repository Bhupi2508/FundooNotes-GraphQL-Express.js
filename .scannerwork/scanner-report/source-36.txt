/******************************************************************************
 *  @Execution      : default node          : cmd> nodemon sendMail.js
 *                      
 * 
 *  @Purpose        : sendMail to the user for forgot password
 * 
 *  @description    : For sending mail
 * 
 *  @overview       : fundoo app
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 04-april-2019
 *
 ******************************************************************************/
/**
 * @requires files
 */
const nodemailer = require('nodemailer');

/**
 * @purpose : send mail to the given mail id for verification
 * @exports sendEmailFunction
 * @param {String} url
 * @param {String} email
 * @returns {String} message
 */
exports.sendEmailFunction = (url, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',

        //email and password are hidden by using of env file
        auth: {
            user: process.env.email,
            pass: process.env.password
        },
    });

    const mailOptions = {
        from: process.env.email,
        to: email,
        subject: 'fundoo password reset link ',
        text: 'Please go through the e-mail verifaction link provided in this mail:\n\n' + url
    };

    //send mail from given mail id, by using authriozation info
    var mail = transporter.sendMail(mailOptions)
    if (!mail) {
        return { "message": "is it is invalid, error on sending mail--" }
    }
    return { "message": "Messsage sent successfully" }

}
