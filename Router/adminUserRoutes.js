const express = require("express");
const userController = require("../Controllers/adminusercontroller");

const router = express.Router();

// Define the routes
router.post("/adminsignup", userController.signup); // Route for user signup
router.post("/adminlogin", userController.login); // Route for user login

module.exports = router;
