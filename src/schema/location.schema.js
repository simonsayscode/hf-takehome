const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    locations: [Location!]
    location(id: ID!): Location
  }

  extend type Mutation {
    createLocation(name: String!, address: String!, organizationId: ID!): Location!
    updateLocation(id: ID!, name: String, address: String): Location!
    deleteLocation(id: ID!): Boolean!
  }

  type Location {
    id: ID!
    name: String!
    address: String!
    longitude: String!
    latitude: String!
    createdAt: Date!
    updatedAt: Date!
    organization: Organization!
  }
`;