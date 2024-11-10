const express = require("express");
const router = express.Router();
const screenController = require("../controllers/theatercontroller");
const Authorise = require("../middleware/fetchUser");
// const fetchAdminUser = require('../middleware/fetchAdminUser')


router.get("/screens", screenController.getAllScreens);
router.get("/screens/:id", screenController.getScreenById);
router.post("/screens", screenController.createScreen);
router.put("/screens/:id", screenController.updateScreen);
router.delete("/screens/:id", screenController.deleteScreen);
// router.post(
//   "/screenbookSeat",
//   Authorise.authenticateToken,
//   screenController.bookSeats
// );

module.exports = router;
