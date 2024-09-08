const Ticket = require("../models/Ticket"); 


const { bookSeat } = require("./theatercontroller");

exports.createTicket = async (req, res) => {
  const { user_id, screenId, seats_booked, total_price, number_of_person } =
    req.body;

  try {
    
    for (let seat of seats_booked) {
      const seatBooking = await bookSeat({
        body: {
          screenId,
          slot: seat.slot, 
          seatNumber: seat.seatNumber,
          userId: user_id,
          movieMainId: seat.movieMainId, 
          date: seat.date, 
        },
      });

     
      if (!seatBooking.success) {
        return res.status(400).json({ message: seatBooking.message });
      }
    }

   
    const ticket = new Ticket({
      user_id,
      screenId,
      seats_booked: seats_booked.length, 
      total_price,
      number_of_person,
     
    });

    const newTicket = await ticket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


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
