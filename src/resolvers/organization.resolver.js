const _ = require('lodash');

module.exports = {
  Query: {
    organizations: async (parent, args, { models }) => {
      return await models.Organization.findAll();
    },
    organization: async (parent, { id }, { models }) => {
      return await models.Organization.findByPk(id);
    },
  },

  Mutation: {
    createOrganization: async (parent, { name }, { models }) => {
      return models.Organization.create({
        name,
      });
    },

    updateOrganization: async (parent, { id, name }, { models }) => {
      const organization = await models.Organization.findByPk(id);

      return organization.update(_.pickBy({
        name,
      }, _.identity));
    },

    deleteOrganization: async (parent, { id }, { models }) => {
      return models.Organization.destroy({
        where: { id },
      });
    },
  },

  Organization: {
    locations: async (organization, args, { models }) => {
      return await models.Location.findAll({
        where: {
          organizationId: organization.id,
        },
      });
    },

    events: async (organization, args, { models }) => {
      return await models.Event.findAll({
        where: {
          organizationId: organization.id,
        },
      });
    },
  },
};