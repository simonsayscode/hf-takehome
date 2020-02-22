const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Location = sequelize.define('location', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    latitue: {
      type: Sequelize.FLOAT,
    },
    longitude: {
      type: Sequelize.FLOAT,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  }, {
    timestamps: true,
    tableName: 'locations',
  });

  Location.associate = (models) => {
    Location.belongsTo(models.Organization);
  };

  return Location;
};
