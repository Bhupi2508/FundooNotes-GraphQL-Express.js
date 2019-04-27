/******************************************************************************
 *  @Execution      : default node          : cmd> server.js
 *                      
 * 
 *  @Purpose        : Create APIs and connect server
 * 
 *  @description    : operations using graphql queries
 * 
 *  @overview       : fundoo application
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 02-april-2019
 *
 ******************************************************************************/
/**
 * @requires files
 */
const express = require('express')
const app = express()
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
const bodyParser = require('body-parser')
const mongoose = require('./config/mongoose')
const db = mongoose()
const graphqlExpress = require('express-graphql')
var expressValidator = require('express-validator')
const userSchema = require('./graphql/types/index').userSchema


// const labelSchema = require('./graphql/types/index').n;
require('dotenv').config();

app.use(bodyParser.json())  //bodyparser parse the req
app.use(expressValidator());


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

//middleware 
app.use('/graphql', upload.single('picture'), graphqlExpress((req) => ({
    schema: userSchema,
    rootValue: global,
    context: {
        origin: req.headers.origin,
        token: req.query.token,
        code: req.query.code,
        req: req
    },
    graphiql: true
})))

//listen the given port
var userPort = (process.env.port)
app.listen(userPort, () => {
    console.log('#####################################################################################');
    console.log('##############          STARTING SERVER at port : ', userPort, '               ##############');
    console.log('#####################################################################################');
});

module.exports = app