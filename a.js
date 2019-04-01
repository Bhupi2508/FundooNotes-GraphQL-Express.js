const { ApolloServer, gql, PubSub } = require('apollo-server');

const pubsub = new PubSub();
const SOMETHING_CHANGED_TOPIC = 'something_changed';

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Subscription {
    newMessage: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hello',
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

//publish events every second
setInterval(
  () =>
    pubsub.publish(SOMETHING_CHANGED_TOPIC, {
      newMessage: new Date().toString(),
    }),
  4
);