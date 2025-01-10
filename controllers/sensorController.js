const SensorData = require('../models/SensorData');

/**
 * Fungsi untuk menyimpan atau memperbarui data sensor berdasarkan username.
 */
exports.handleSensorData = async (username, message) => {
  try {
    // Parse message jika dalam bentuk string
    const data = typeof message === 'string' ? JSON.parse(message) : message;
    
    // Periksa apakah pengguna sudah ada di database
    const userSensorData = await SensorData.findOne({ where: { username } });

    if (userSensorData) {
      // Jika sudah ada, perbarui kolom last_data dan data lainnya
      userSensorData.last_data = data.data;
      userSensorData.tegangan = data.tegangan;
      userSensorData.waktu = data.waktu;
      await userSensorData.save();
      console.log(`Updated data for user: ${username}`);
    } else {
      // Jika belum ada, buat entri baru
      await SensorData.create({
        username,
        first_data: data.data,
        last_data: data.data,
        tegangan: data.tegangan,
        waktu: data.waktu
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
