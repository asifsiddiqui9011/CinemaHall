const express = require("express");
const userController = require("../controllers/adminusercontroller");
// const fetchAdminUser = require('../middleware/fetchAdminUser')

const router = express.Router();


router.post("/adminsignup", userController.signup); 
router.post("/adminlogin", userController.login); 
router.get("/adminUser", userController.getUser);

module.exports = router;
