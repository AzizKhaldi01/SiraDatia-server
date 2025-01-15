const express = require("express")
const { editProfile } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()


router.put('', authMiddleware, editProfile)

module.exports = router;