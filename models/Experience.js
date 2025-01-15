const mongoose = require("mongoose");

 const experienceSchema = new mongoose.Schema({
    companyName: { type: String },
    jobTitle: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
  });

module.exports = experienceSchema