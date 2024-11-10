const express = require("express");
const slotController = require("../controllers/slotController.js");
const router = express.Router();
//const middleware = require('../middleware/fetchUser.js');
const fetchUser = require("../middleware/fetchUser.js");

router.post('/addslot',slotController.addslot);
router.get("/getslot",slotController.getSlot);
router.post('/bookTicket/:movieId/:screenId/:slotId',fetchUser, slotController.bookTicket);
router.patch('/updateMovieToSlot',slotController.updateMovieToSlot);
router.delete('/deleteslot',slotController.deleteslot);
router.delete('/deleteMovieFromSlot/:slotId',slotController.deleteMovieFromSlot);
router.delete('/tickets/cancel/:ticketId',fetchUser,slotController.cancelTicket);


module.exports = router;