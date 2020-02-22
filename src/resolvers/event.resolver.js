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
    createEvent: async (parent, { name, date, organizationId }, { models }) => {
      return models.Event.create({
        organizationId,
        name,
        date,
      });
    },

    updateEvent: async (parent, { id, name, date }, { models }) => {
      const event = await models.EVent.findByPk(id);

      return event.update(_.pickBy({
        name,
        date,
      }, _.identity));
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