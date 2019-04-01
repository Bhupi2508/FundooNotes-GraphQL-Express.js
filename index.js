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
const db = 'mongodb://localhost:27017/graphql'
const mongoose = require('mongoose')
const graphQlExpress = require('express-graphql')
const { ApolloServer, gql } = require('apollo-server')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

/* This is a (sample) collection of books we'll be able to query
   the GraphQL server for.  A more complete example might fetch
   from an existing data source like a REST API or database.
*/
const books = [
    {
        name: 'harry',
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        name: 'park',
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];


/* Type definitions define the "shape" of your data and specify
   which ways the data can be fetched from the GraphQL server.
*/
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    name: String
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
  }
`;

/*
 Resolvers define the technique for fetching the types in the
 schema.  We'll retrieve books from the "books" array above.
*/
const resolvers = {
    Query: {
        books: () => books,
    },
};

/* In the most basic sense, the ApolloServer can be started
   by passing type definitions (typeDefs) and the resolvers
   responsible for fetching the data for those types.
*/
const server = new ApolloServer({ typeDefs, resolvers });

/* This `listen` method launches a web-server.  Existing apps
   can utilize middleware options, which we'll discuss later.
*/
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

mongoose.connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true
}
)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
