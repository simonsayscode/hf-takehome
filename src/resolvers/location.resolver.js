const _ = require('lodash');
const axios = require('axios');

const { GOOGLE_API_KEY } = process.env;

const getGeolocation = async function getGeolocation(address) {
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`)
    .then(function ({ data }) {
      if (data.status !== 'OK') {
        throw new Error('Error with geolocation fetch.');
      } else if (data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find a geolocation with that address.');
      }

      const [{ geometry }] = data.results;

      return geometry.location;
    });
}

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
    createLocation: async (parent, { name, address, organizationId }, { models }) => {
      const { lat: latitude, lng: longitude } = await getGeolocation(address);

      return models.Location.create({
        organizationId,
        name,
        address,
        latitude,
        longitude,
      });
    },

    updateLocation: async (parent, { id, name, address }, { models }) => {
      const location = await models.Location.findByPk(id);
      let latitude = null;
      let longitude = null;

      if (address) {
        const geolocation = await getGeolocation(address);
        latitude = geolocation.lat;
        longitude = geolocation.lng;
      }

      return location.update(_.pickBy({
        name,
        address,
        latitude,
        longitude,
      }, _.identity));
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