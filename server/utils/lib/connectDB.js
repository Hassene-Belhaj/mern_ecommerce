const mongoose = require("mongoose");

const connectToDb = async (url) => {
  try {
    return mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectToDb,
};
