const Sequelize = require('sequelize');

const { DATABASE_URL } = process.env;

// Checking presence of valid environmental variables.
if (!DATABASE_URL) {
  console.error('Missing database config values');
  process.exit(1);
}

const connectionOptions = {
  dialect: 'postgres',
};

if (process.env.NODE_ENV !== 'local') {
  connectionOptions.dialectOptions = {
    ssl: true,
  };
}

const sequelize = new Sequelize(DATABASE_URL, connectionOptions);

const promiseOfConnection = sequelize.sync();

module.exports = {
  connected: promiseOfConnection,
  client: sequelize,
};
