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
  jenis_kelamin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_data: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tegangan: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  waktu: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = SensorData;
