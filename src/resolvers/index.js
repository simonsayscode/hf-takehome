const { GraphQLDateTime } = require('graphql-iso-date');

const organizationResolver = require('./organization.resolver');
const eventResolver = require('./event.resolver');
const locationResolver = require('./location.resolver');

const customScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [
  customScalarResolver,
  organizationResolver,
  eventResolver,
  locationResolver,
];