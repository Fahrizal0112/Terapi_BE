const SensorData = require('../models/SensorData');

/**
 * Fungsi untuk menyimpan atau memperbarui data sensor berdasarkan username.
 */
exports.handleSensorData = async (username, payload) => {
  try {
    const [gsr1, gsr2] = payload.data.split('|');
    
    const userSensorData = await SensorData.findOne({ where: { username } });
    
    if (userSensorData) {
      // Update dengan nilai yang sesuai
      userSensorData.first_data = gsr1;
      userSensorData.last_data = gsr2;
      userSensorData.tegangan = payload.tegangan;
      userSensorData.jenis_kelamin = payload.jenis_kelamin;
      userSensorData.waktu = payload.waktu;
      await userSensorData.save();
      console.log(`Updated data for user: ${username}`, payload);
    } else {
      await SensorData.create({
        username,
        first_data: gsr1,
        last_data: gsr2,
        jenis_kelamin: payload.jenis_kelamin,
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
