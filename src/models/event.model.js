const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Event = sequelize.define('event', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  }, {
    timestamps: true,
    tableName: 'events',
  });

  Event.associate = (models) => {
    Event.belongsTo(models.Organization);
  };

  return Event;
};
