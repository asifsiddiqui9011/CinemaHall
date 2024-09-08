const express = require("express");
const router = express.Router();
const screenController = require("../controllers/theatercontroller"); // Adjust the path as necessary
const Authorise = require("../middleware/midddleware");
const fetchAdminUser = require('../middleware/fetchAdminUser')

// Define routes/
router.get("/screens", screenController.getAllScreens);
router.get("/screens/:id", screenController.getScreenById);
router.post("/screens", screenController.createScreen);
router.put("/screens/:id", screenController.updateScreen);
router.delete("/screens/:id", screenController.deleteScreen);
router.post(
  "/screenbookSeat",
  Authorise.authenticateToken,
  screenController.bookSeats
);

module.exports = router;
