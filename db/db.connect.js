const mongoose = require("mongoose");
require("dotenv").config();

const dbUri = process.env.MONGODB;
const initializeDatabase = async () => {
  await mongoose
    .connect(dbUri)
    .then(() => console.log("Database connected successfully."))
    .catch(() =>
      console.log("An error occurred while connecting to database.")
    );
};

module.exports = { initializeDatabase };
