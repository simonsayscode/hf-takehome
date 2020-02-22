require('dotenv').config();

const { ApolloServer } = require('apollo-server');

const schema = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');
const { connected } = require('./config/sequelize.config');

const { PORT } = process.env;

// Checking presence of valid environmental variables.
if (!PORT) {
  console.error('Missing config values');
  process.exit(1);
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
  },
});

// Start the server after successful connection.
connected
  .then(() => server.listen({
    port: PORT,
  }))
  .then(() => {
    console.log('🚀 Server ready at', PORT);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });