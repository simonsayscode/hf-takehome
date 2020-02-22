const _ = require('lodash');

module.exports = {
  Query: {
    events: async (parent, args, { models }) => {
      return await models.Event.findAll();
    },
    event: async (parent, { id }, { models }) => {
      return await models.Event.findByPk(id);
    },
  },

  Mutation: {
    createEvent: async (parent, { name, date }, { models }) => {
      return models.Event.create({
        name,
        date,
      });
    },

    updateEvent: async (parent, { id, name, date }, { models }) => {
      return models.Event.update(_.pickBy({
        name,
        date,
      }, _.identity), {
        where: {
          id,
        },
      });
    },

    deleteEvent: async (parent, { id }, { models }) => {
      return models.Event.destroy({
        where: {
          id,
        },
      });
    },
  },

  Event: {
    organization: async (event) => {
      return event.getOrganization();
    },
  },
};