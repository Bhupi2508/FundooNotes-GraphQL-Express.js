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
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('./config/mongoose')
const db = mongoose()
var passport = require('passport')
var session = require('express-session')
const graphqlExpress = require('express-graphql')
var expressValidator = require('express-validator')
const gitAuth = require('./Authentication/githubAuth')
const userSchema = require('./graphql/types/index').userSchema


// const labelSchema = require('./graphql/types/index').n;
require('dotenv').config();

app.use(bodyParser.json())  //bodyparser parse the req
app.use(expressValidator());

app.use(session({
    secret: process.env.secretKey,
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

// app.get('/login/github',
//   passport.authenticate('github'));

//middleware for social auth
app.use('/graphql', graphqlExpress((req) => ({
    schema: userSchema,
    rootValue: global,
    context: {
        origin: req.headers.origin,
        token: req.query.token,
        code: req.query.code
    },
    graphiql: true
})))

//listen the given port
var userPort = (process.env.port)
app.use('*', cors());
app.listen(userPort, () => {
    console.log('#####################################################################################');
    console.log('##############          STARTING SERVER at port : ', userPort, '               ##############');
    console.log('#####################################################################################');
});

module.exports = app