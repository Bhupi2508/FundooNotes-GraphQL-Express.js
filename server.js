/******************************************************************************
 *  Execution       : default node          : cmd> index.js
 *                      
 * 
 *  Purpose         : Create APIs and connect server
 * 
 *  @description    
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
const express = require('express')
const app = express()
const cors = require('cors')
var redis = require('redis');
const bodyParser = require('body-parser')
const mongoose = require('./config/mongoose')
const db = mongoose()
const graphqlExpress = require('express-graphql')
var expressValidator = require('express-validator')
const userSchema = require('./graphql/types/index').userSchema;
var client = redis.createClient();
require('dotenv').config();

/*
 bodyparser parse the req
*/
app.use(bodyParser.json())
app.use(expressValidator());

app.use('/graphql', cors(), graphqlExpress((req) => ({
    schema: userSchema,
    rootValue: global,
    context: { token: req.headers.authorization },
    graphiql: true
})))

var userPort = (process.env.port)
app.use('*', cors());
app.listen(userPort, () => {
    console.log('#####################################################################################');
    console.log('##############          STARTING SERVER at port : ', userPort, '               ##############');
    console.log('#####################################################################################');
});

module.exports = app