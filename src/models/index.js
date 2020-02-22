const _ = require('lodash');

const { client: sequelize } = require('../config/sequelize.config');

// Models
const Organization = require('./organization.model');
const Event = require('./event.model');
const Location = require('./location.model');

const models = _.transform({
  Organization,
  Event,
  Location,
}, (result, modelInitializer, modelName) => {
  result[modelName] = modelInitializer(sequelize);
}, {});

_.forEach(models, (model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = models;
