const express = require("express");
const router = express.Router();
const screenController = require("../controllers/theatercontroller");
//const Authorise = require("../middleware/fetchUser");
const fetchAdminUser = require('../middleware/fetchAdminUser')


router.get("/screens", screenController.getAllScreens);
router.get("/ownerscreens",fetchAdminUser, screenController.getOwnerScreens);
router.get("/screens/:id", screenController.getScreenById);
router.post("/screens", fetchAdminUser,screenController.createScreen);
router.put("/screens/:id", fetchAdminUser,screenController.updateScreen);
router.delete("/screens/:id", screenController.deleteScreen);
// router.post(
//   "/screenbookSeat",
//   Authorise.authenticateToken,
//   screenController.bookSeats
// );

module.exports = router;
