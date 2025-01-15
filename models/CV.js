const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  companyName: { type: String },
  jobTitle: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
});

const educationSchema = new mongoose.Schema({
  institutionName: { type: String },
  degree: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
});

const skillSchema = new mongoose.Schema({
  skillName: { type: String },
  proficiencyLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
});

const socialLinkSchema = new mongoose.Schema({
  platform: { type: String },
  url: { type: String },
});

const CVshema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  teamplateId: { type: String },
  urlPreview: { type: String },
  country: { type: String },
  city: { type: String },
  jobTitle: { type: String },
  professionalSummary: { type: String },
  cvStatus: { type: String },
  experiences: [experienceSchema], // Embedded experiences
  educations: [educationSchema], // Embedded educations
  skills: [skillSchema], // Embedded skills
  socialLinks: [socialLinkSchema], // Embedded social links
});

module.exports = mongoose.model("CV", CVshema);
