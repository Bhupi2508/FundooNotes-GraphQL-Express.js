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
require('dotenv').config();
const bodyParser = require('body-parser')
const mongoose = require('./config/mongoose')
const db = mongoose()
const graphqlExpress = require('express-graphql')
var expressValidator = require('express-validator')
var upload = require('./services/aws-s3Services')
const c = require('./graphql/types/index').userSchema


//bodyparser parse the req
app.use(bodyParser.json())
app.use(expressValidator());


//middleware for s3 APIs
app.use('/graphql', upload.single('picture'))

//middleware 
app.use('/graphql', graphqlExpress((req) => ({
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
var userPort = (process.env.port || 4000)
app.listen(userPort, () => {
    console.log('#####################################################################################');
    console.log('##############          STARTING SERVER at port : ', userPort, '               ##############');
    console.log('#####################################################################################');
});


/**
 * @exports app
 */
module.exports = app