const mongoose = require('mongoose');
const logger = require('../utils/logger');

// connectDb function
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (error) {
    logger.error('Database Connection Error', error);
  }
}

// export
module.exports = connectDb;