const mqtt = require('mqtt');
require('dotenv').config();

const MQTT_BROKER = process.env.MQTT_BROKER || 'mqtt://broker.emqx.io';
const MQTT_TOPIC = process.env.MQTT_TOPIC || 'sensor/data';

const client = mqtt.connect(MQTT_BROKER);

client.on('connect', () => {
  console.log('Connected to MQTT Broker');
  client.subscribe(MQTT_TOPIC, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
    } else {
      console.error('Subscription error:', err);
    }
  });
});

client.on('error', (err) => {
  console.error('MQTT Connection Error:', err);
});

module.exports = client;
