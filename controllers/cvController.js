const logger = require("../utils/logger");
const CV = require("../models/CV");

const addCv = async (req, res) => {
  try {
    // Destructure the necessary fields from the request body
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      jobTitle,
      professionalSummary,
      experiences = [],
      educations = [],
      skills = [],
      socialLinks = [],
    } = req.body;

    // Create the new CV document
    const newCv = new CV({
      userId: req.user.userId,
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      jobTitle,
      professionalSummary,
      experiences,
      educations,
      skills,
      socialLinks,
    });

    const savedCV = await newCv.save();

    res.status(201).json({
      message: "CV and related data created successfully",
      data: savedCV,
    });
  } catch (error) {
    logger.error("Error creating CV:", error);
    res.status(500).json({
      message: "Error creating CV",
      error: error.message,
    });
  }
};

// get cv by id
const getCVById = async (req, res) => {
  try {
    const { id } = req.params;
    const cv = await CV.findById(id);
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.status(200).json(cv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch CV", error: err.message });
  }
};

module.exports = { addCv, getCVById };

// Get CVs by User ID
const getCVsByUserId = async (req, res) => {
  try {
    console.log(req.user.userId);
    const cvs = await CV.find({ userId: req.user.userId }); // Query by userId

    if (cvs.length === 0) {
      return res.status(404).json({ message: "No CVs found for this user" });
    }

    const getCvs = cvs.map((cv) => ({
      id: cv._id,
      jobTitle: cv.jobTitle,
      urlPreview: cv.urlPriveiw,
      createdAt: cv.createdAt, // Include the createdAt field
    }));

    res.status(200).json(getCvs);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to fetch CVs", error: err.message });
  }
};

// Get CVs by User ID
const DeleteCVById = async (req, res) => {
  try {
    const { id } = req.params;

    const selectedCv = await CV.findById(id); // Query by userId

    if (!selectedCv) {
      return res.status(404).json({ message: "No CV found" });
    }

    await CV.deleteOne({ _id: id });

    res.status(200).json(`the cv with the id ${id}  was deleted  `);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to fetch CVs", error: err.message });
  }
};

// Get CVs by User ID
const EditCv = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const selectedCv = await CV.findById(id);

    if (!selectedCv) {
      return res.status(404).json({ message: "No CV found" });
    }

    const updatedData = {
      ...data,
      userId: selectedCv.userId
    };

    await CV.replaceOne({ _id: id }, updatedData);

    const updatedCV = await CV.findById(id);

    res.status(200).json({
      message: `The CV with id ${id} was updated successfully`,
      data: updatedCV
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to update CV", error: err.message });
  }
};

module.exports = { addCv, getCVById, getCVsByUserId, DeleteCVById, EditCv };
