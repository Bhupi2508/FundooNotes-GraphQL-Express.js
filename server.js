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
app.use('/graphql', cors(), graphqlExpress({
    schema: userSchema,
    rootValue: global,
    graphiql: true
}))

app.use('*', cors());
app.listen(4000, () => {
    console.log("This GraphQL API running at port 4000");
});

 

