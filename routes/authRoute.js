const express = require("express");
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.get('/logout', authController.logout);
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/adminify', authMiddleware.authverify, authMiddleware.isAdmin, adminController.makeUserAdmin);
router.get('/deadminify', authMiddleware.authverify, authMiddleware.isAdmin, adminController.revokeAdmin);

module.exports = router;
