const { gql } = require('apollo-server');

const organizationSchema = require('./organization.schema');
const eventSchema = require('./event.schema');
const locationSchema = require('./location.schema');

const linkSchema = gql`
  scalar Date
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

module.exports = [linkSchema, organizationSchema, eventSchema, locationSchema];
