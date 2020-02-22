const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    organizations: [Organization]
    organization(id: ID!): Organization
  }

  extend type Mutation {
    createOrganization(name: String!): Organization!
    updateOrganization(id: ID!, name: String!): Organization!
    deleteOrganization(id: ID!): Boolean!
  }

  type Organization {
    id: ID!
    name: String!
    createdAt: Date!
    updatedAt: Date!
    locations: [Location!]
    events: [Event!]
  }
`;