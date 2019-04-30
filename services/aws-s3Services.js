/********************************************************************************************************************
 *  @Execution      : default node          : cmd> aws-s3Services.js
 *                      
 * 
 *  @Purpose        : upload a pic on aws-s3 services 
 * 
 *  @description    : using graphql upload a pic in s3
 * 
 *  @overview       : fundoo application  
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 30-april-2019
 *
 *******************************************************************************************************************/
/**
 * @requires files
 */
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

//for s3 upload a pic in S# bucket
var s3 = new aws.S3({
    bucketName: 'myfundoo',
    region: 'ap-south-1',
    accessKeyId: process.env.awsID,
    secretAccessKey: process.env.awsSecret,
    s3Url: 'https://my-s3-url.com/.jpg',
})

//create a uplaod file for given aws information
var upload = multer({  
    storage: multerS3({
        s3: s3,
        bucket: 'myfundoo',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})


/**
 * @exports upload
 */
module.exports = upload