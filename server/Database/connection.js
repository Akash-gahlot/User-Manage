const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_HOST;

const connectDB = async () => { 
    try {
   const con =await mongoose.connect(url);
        console.log(`Connected to MongoDB:${ con.connection.host }`);
    }
    catch(err) { 
        console.log(err);
    }
}

module.exports = connectDB;