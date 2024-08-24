const Ticket = require("../Models/Ticket"); // Adjust the path as necessary

// Create a new ticket
// Assuming bookSeat is exported as a named export from the same file or a separate module
const { bookSeat } = require("./theatercontroller");

exports.createTicket = async (req, res) => {
  const { user_id, screenId, seats_booked, total_price, number_of_person } =
    req.body;

  try {
    // Iterate over each seat to book them
    for (let seat of seats_booked) {
      const seatBooking = await bookSeat({
        body: {
          screenId,
          slot: seat.slot, // Assume `slot` is part of each seat in seats_booked
          seatNumber: seat.seatNumber,
          userId: user_id,
          movieMainId: seat.movieMainId, // Assume this is part of each seat in seats_booked
          date: seat.date, // Assume this is part of each seat in seats_booked
        },
      });

      // If the booking failed, respond with an error
      if (!seatBooking.success) {
        return res.status(400).json({ message: seatBooking.message });
      }
    }

    // Create the ticket after booking seats
    const ticket = new Ticket({
      user_id,
      screenId,
      seats_booked: seats_booked.length, // Assuming seats_booked is an array of seat numbers
      total_price,
      number_of_person,
      // booking_time and created_at are automatically set
    });

    const newTicket = await ticket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("user_id")
      .populate("screenId");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("user_id")
      .populate("screenId");
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a ticket by ID (e.g., cancel a ticket)
exports.updateTicket = async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTicket)
      return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a ticket by ID
exports.deleteTicket = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket)
      return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel a ticket by ID
exports.cancelTicket = async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { cancellation: true },
      { new: true }
    );
    if (!updatedTicket)
      return res.status(404).json({ message: "Ticket not found" });
    res
      .status(200)
      .json({
        message: "Ticket cancelled successfully",
        ticket: updatedTicket,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
