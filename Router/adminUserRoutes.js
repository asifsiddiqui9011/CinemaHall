const express = require("express");
const userController = require("../controllers/adminusercontroller");
const fetchAdminUser = require('../middleware/fetchAdminUser')

const router = express.Router();


router.post("/adminsignup", userController.signup); 
router.post("/adminlogin", userController.login); 
router.get("/adminUser",fetchAdminUser, userController.getUser);
router.put("/adminUser/:id", userController.updateAdminUser);
router.get("/allAdmins", userController.getAllAdminUsers);
router.get('/alltheaterUser', userController.getAllTheaterOwners)

module.exports = router;
