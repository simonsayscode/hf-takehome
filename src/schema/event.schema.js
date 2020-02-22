const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    events: [Event!]
    event(id: ID!): Event
  }

  extend type Mutation {
    createEvent(name: String!, date: Date!, organizationId: ID!): Event!
    updateEvent(id: ID!, name: String, date: Date): Event!
    deleteEvent(id: ID!): Boolean!
  }

  type Event {
    id: ID!
    name: String!
    date: Date!
    createdAt: Date!
    updatedAt: Date!
    organization: Organization!
  }
`;