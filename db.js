const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/'; // Replace with your MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('liveshare'); // Use your database name
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB;
