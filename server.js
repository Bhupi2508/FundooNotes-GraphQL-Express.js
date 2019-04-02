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
const mongoose = require('mongoose')
const cors = require('cors')
const graphqlExpress = require('express-graphql')
const configDB = require('./config/config')
const typeDefs = require('./model/schema')
const { makeExecutableSchema } = require('graphql-tools')
const app = express()
// const dataBase = mongoose();

app.use('*', cors());
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

 

