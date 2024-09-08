const express = require("express");
const slotController = require("../controllers/slotController.js");
const router = express.Router();
const middleware = require('../middleware/midddleware.js')

router.post('/addslot',slotController.addslot);
router.get("/getslot",slotController.getSlot);
router.post('/bookTicket/:screenId/:slotId', slotController.bookTicket);
router.patch('/updateMovieToSlot',slotController.updateMovieToSlot);
router.delete('/deleteslot',slotController.deleteslot);
router.delete('/deleteMovieFromSlot/:slotId',slotController.deleteMovieFromSlot);
router.delete('/tickets/cancel/:ticketId',slotController.cancelTicket);


module.exports = router;