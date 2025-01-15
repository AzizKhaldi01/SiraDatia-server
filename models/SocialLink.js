const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
  platform: { type: String },
  url: { type: String },
});

module.exports = mongoose.model('SocialLink', socialLinkSchema);
