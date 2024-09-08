// ticketRoutes.js

const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketcontroller");

// Route to create a new ticket
router.post("/tickets", ticketController.createTicket);

// Route to get all tickets
router.get("/tickets", ticketController.getAllTickets);

// Route to get a single ticket by ID
router.get("/tickets/:id", ticketController.getTicketById);

// Route to update a ticket by ID (e.g., cancel a ticket)
router.put("/tickets/:id", ticketController.updateTicket);

// Route to delete a ticket by ID
router.delete("/tickets/:id", ticketController.deleteTicket);

// Route to cancel a ticket by ID
router.patch("/tickets/:id/cancel", ticketController.cancelTicket);

module.exports = router;
