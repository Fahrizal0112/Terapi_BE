const express = require('express');
const sequelize = require('./config/database');
const SensorData = require('./models/SensorData');
const mqttClient = require('./config/mqtt');
const { handleSensorData, getAllSensorData } = require('./controllers/sensorController');
const cors = require('express');

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint untuk mendapatkan semua data sensor
app.get('/api/sensor-data', getAllSensorData);

// MQTT Handler
mqttClient.on('message', async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());

    if (payload.username && payload.data) {
      await handleSensorData(payload.username, payload.data);
    } else {
      console.warn('Invalid MQTT message format:', message.toString());
    }
  } catch (error) {
    console.error('Error processing MQTT message:', error);
  }
});

sequelize.sync().then(() => {
  console.log('Database connected and synchronized');
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
