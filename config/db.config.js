const mongoose = require('mongoose');
// require('dotenv').config();
const connectDB =  async () => {
    try {
        const con = await mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`Database connected on the host ${con.connection.host}`);
    } catch (error) {
        throw error;
    }
}

module.exports = connectDB;