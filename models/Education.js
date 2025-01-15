const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  institutionName: { type: String,  },
  degree: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
});

module.exports = mongoose.model("Education", educationSchema);
