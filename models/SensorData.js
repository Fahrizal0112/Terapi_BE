const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SensorData = sequelize.define('SensorData', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  first_data: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_data: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = SensorData;
