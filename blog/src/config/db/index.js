const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useUnifiedTopology: true, // For Mongoose 5 only. Remove for Mongoose 6+
      serverSelectionTimeoutMS: 1000, // Defaults to 30000 (30 seconds)
    })

    console.log('connect successfully')
  } catch (error) {
    console.log('connect fail')
  }
}
module.exports = { connect }
