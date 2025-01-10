const SensorData = require('../models/SensorData');

/**
 * Fungsi untuk menyimpan atau memperbarui data sensor berdasarkan username.
 */
exports.handleSensorData = async (username, payload) => {
  try {
    const userSensorData = await SensorData.findOne({ where: { username } });

    if (userSensorData) {
      // Update dengan nilai yang sesuai
      userSensorData.last_data = payload.data;
      userSensorData.tegangan = payload.tegangan;
      userSensorData.waktu = payload.waktu;
      await userSensorData.save();
      console.log(`Updated data for user: ${username}`, payload);
    } else {
      // Create dengan nilai yang sesuai
      await SensorData.create({
        username,
        first_data: payload.data,
        last_data: payload.data,
        tegangan: payload.tegangan,
        waktu: payload.waktu
      });
      console.log(`Created new entry for user: ${username}`, payload);
    }
  } catch (error) {
    console.error('Error handling sensor data:', error);
    console.error('Payload:', payload);
  }
};

/**
 * Fungsi untuk mendapatkan semua data sensor.
 */
exports.getAllSensorData = async (req, res) => {
  try {
    const data = await SensorData.findAll();
    res.json(data);
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
