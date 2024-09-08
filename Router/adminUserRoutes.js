const express = require("express");
const userController = require("../controllers/adminusercontroller");
const fetchAdminUser = require('../middleware/fetchAdminUser')

const router = express.Router();

// Define the routes
router.post("/adminsignup", userController.signup); // Route for user signup
router.post("/adminlogin", userController.login); // Route for user login
router.get("/adminUser",fetchAdminUser.authenticateToken, userController.getUser);

module.exports = router;
