const mongoose = require('mongoose');

async function connect() {
 try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('connect successfully')
 }
 catch(error){
    console.log('connect fail')
 }
}
module.exports = { connect }