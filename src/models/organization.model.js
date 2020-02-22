const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Organization = sequelize.define('organization', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  }, {
    timestamps: true,
    tableName: 'organizations',
  });

  Organization.associate = (models) => {
    Organization.hasMany(models.Event);
    Organization.hasMany(models.Location);
  };

  return Organization;
};
