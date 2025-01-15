const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  skillName: { type: String },
  proficiencyLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
});

module.exports = mongoose.model('Skill', skillSchema);
