const express = require("express");
const { getCVById, addCv, getCVsByUserId, DeleteCVById, EditCv } = require("../controllers/cvController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("", authMiddleware , addCv);
router.get("/selectcv/:id",authMiddleware, getCVById);
router.delete("/selectcv/:id",authMiddleware, DeleteCVById);
router.put("/selectcv/:id",authMiddleware, EditCv);
router.get("/cvs",authMiddleware, getCVsByUserId);

module.exports = router