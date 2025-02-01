const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
const connectdb = async()=>{
try {
   await mongoose.connect(URI); 
   console.log("connection to database is successfull");
} catch (error) {
    console.error("Failed to connect with the database");
    process.exit(0);
}
};

module.exports = connectdb;