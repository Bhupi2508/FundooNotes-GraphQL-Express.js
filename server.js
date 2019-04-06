/******************************************************************************
 *  Execution       : default node          : cmd> index.js
 *                      
 * 
 *  Purpose         : Create APIs
 * 
 *  @description    
 * 
 *  @overview       : GraphQL APIs
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 01-april-2019
 *
 ******************************************************************************/
/*
required files
*/
const express = require('express')
const cors = require('cors')
const graphqlExpress = require('express-graphql')
const userSchema = require('./graphql/types/index').userSchema;
const mongoose = require('./config/mongoose')
const db = mongoose();
const app = express()
const bodyParser = require('body-parser')
var expressValidator = require('express-validator')
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
    console.log('#####################################################################################\n');
});



