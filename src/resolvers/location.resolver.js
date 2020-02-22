const _ = require('lodash');

module.exports = {
  Query: {
    locations: async (parent, args, { models }) => {
      return await models.Location.findAll();
    },
    location: async (parent, { id }, { models }) => {
      return await models.Location.findByPk(id);
    },
  },

  Mutation: {
    createLocation: async (parent, { name, address }, { models }) => {
      return models.Location.create({
        name,
        address,
      });
    },

    updateLocation: async (parent, { id, name, address }, { models }) => {
      return models.Location.update(_.pickBy({
        name,
        address,
      }, _.identity), {
        where: {
          id,
        },
      });
    },

    deleteLocation: async (parent, { id }, { models }) => {
      return models.Location.destroy({
        where: {
          id,
        },
      });
    },
  },

  Location: {
    organization: async (location) => {
      return location.getOrganization();
    },
  },
};