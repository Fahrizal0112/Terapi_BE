const SensorData = require('../models/SensorData');

/**
 * Fungsi untuk menyimpan atau memperbarui data sensor berdasarkan username.
 */
exports.handleSensorData = async (username, message) => {
  try {
    // Cek apakah message adalah JSON valid
    let data;
    try {
      data = typeof message === 'string' ? JSON.parse(message) : message;
    } catch (e) {
      console.log('Message bukan format JSON:', message);
      // Jika bukan JSON, asumsikan ini adalah data sensor langsung
      data = {
        username: username,
        data: message,
        tegangan: null,
        waktu: null
      };
    }
    
    console.log('Processed data:', data);
    
    if (!data.username) {
      throw new Error('Username tidak ditemukan dalam data');
    }
    
    const userSensorData = await SensorData.findOne({ where: { username: data.username } });

    if (userSensorData) {
      // Update existing data
      await userSensorData.update({
        last_data: data.data || null,
        tegangan: data.tegangan || null,
        waktu: data.waktu || null
      });
      console.log(`Updated data for user: ${data.username}`);
    } else {
      // Create new entry
      await SensorData.create({
        username: data.username,
        first_data: data.data || null,
        last_data: data.data || null,
        tegangan: data.tegangan || null,
        waktu: data.waktu || null
      });
      console.log(`Created new entry for user: ${data.username}`);
    }
  } catch (error) {
    console.error('Error handling sensor data:', error);
    console.error('Received message:', message);
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
