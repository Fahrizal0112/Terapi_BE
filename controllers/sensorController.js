const SensorData = require('../models/SensorData');

/**
 * Fungsi untuk menyimpan atau memperbarui data sensor berdasarkan username.
 */
exports.handleSensorData = async (username, message) => {
  try {
    // Periksa apakah pengguna sudah ada di database
    const userSensorData = await SensorData.findOne({ where: { username } });

    if (userSensorData) {
      // Jika sudah ada, perbarui kolom last_data
      userSensorData.last_data = message;
      await userSensorData.save();
      console.log(`Updated last_data for user: ${username}`);
    } else {
      // Jika belum ada, buat entri baru dengan first_data
      await SensorData.create({
        username,
        first_data: message,
        last_data: message,
        tegangan: 0,
        waktu: new Date().toISOString(),
      });
      console.log(`Created new entry for user: ${username}`);
    }
  } catch (error) {
    console.error('Error handling sensor data:', error);
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
