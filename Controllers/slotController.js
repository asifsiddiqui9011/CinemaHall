
const Slot = require('../models/Slot.js');
const Screen = require('../models/Theater.js')
const User = require('../models/User.js')


exports.addslot = async (req, res)=>{
    try {
     
        const { movieId,start,end,theater_id}=req.body
        console.log(start,"start")
        const newSlot = new Slot({
            theater_id,
            movieId,
            start,
            end
        });

        const savedSlot = await newSlot.save();
        const slotId = savedSlot.id
        await Screen.findByIdAndUpdate(theater_id,{$push:{slot:[slotId]}})

        res.status(201).json({success:true});
    } catch (error) {
        console.log("error",error)
        res.status(500).json({
            message: "Error creating user",
            error: error.message || error,
          });
    }
    
}


exports.deleteslot = async (req, res) => {
  try {
    // Retrieve the slot ID and theater ID from the request body
    const { slotId, theater_id } = req.query;

    // Validate the slot ID and theater ID (optional, but recommended for security)
    if (!slotId || !theater_id) {
      return res.status(400).json({ message: "Invalid slot ID or theater ID" });
    }

    // Find the slot by ID and populate the theater field for efficient deletion
    const slotToDelete = await Slot.findById(slotId).populate('theater_id');

    // Check if the slot exists
    if (!slotToDelete) {
      return res.status(404).json({ message: "Slot not found" });
    }

    // Verify that the provided theater ID matches the slot's theater
    if (slotToDelete.theater_id._id.toString() !== theater_id) {
      return res.status(400).json({ message: "Slot and theater ID mismatch" });
    }

    // Remove the slot from the associated theater's slots array
    await Screen.findByIdAndUpdate(
      theater_id,
      { $pull: { slot: slotId } },
      { new: true } // Return the updated theater document
    );

    // Delete the slot document
    await Slot.findByIdAndDelete(slotId);

    res.status(200).json({success:true, message: "Slot deleted successfully" });
  } catch (error) {
    console.error("Error deleting slot:", error);
    res.status(500).json({ message: "Error deleting slot" });
  }
};


exports.getSlot = async (req,res)=>{
    try {
        const slot = await Slot.find({})
        res.status(200).json(slot)
    } catch (error) {
       console.log("error",error)
       res.status(404).json({message:"book not found"}) 
    }
    

}


  
exports.updateMovieToSlot = async (req, res) => {
  try {
    const { slotId, movieId } = req.query;

    const updatedSlot = await Slot.findByIdAndUpdate(
      slotId,
      { movieId },
      { new: true, runValidators: true }
    );

    if (!updatedSlot) return res.status(404).json({ message: "Slot not found" });

    res.status(200).json({ success: true, message: "Movie updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


  // API to delete the movie from a slot
exports.deleteMovieFromSlot =  async (req, res) => {
    try {
      const { slotId } = req.params;
  
      const updatedSlot = await Slot.findByIdAndUpdate(
        slotId,
        { $unset: { movieId: null }},
        { new: true, runValidators: true }
    );
  
      if (!updatedSlot) return res.status(404).json({ message: "Slot not found" });
      
  
      res.status(200).json({success:true, message: "Movie deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  

  const hasDuplicateDate = (tickets, date) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return tickets.some(ticket => {
      const ticketDate = ticket.date instanceof Date ? ticket.date : new Date(ticket.date);
      return ticketDate.toISOString().split('T')[0] === dateObj.toISOString().split('T')[0];
    });
  };
  
  
  // exports.addTicketToSlot = async (req, res) => {
  //   try {
  //     const { slotId, tickets } = req.body;
  
  //     // Find the slot by ID
  //     const slot = await Slot.findById(slotId);
  //     if (!slot) return res.status(404).json({ message: "Slot not found" });
  
  //     const addedTickets = [];
  
  //     // Loop through the tickets in the request body
  //     for (const ticketData of tickets) {
  //       const { key, type, ticket } = ticketData;
  
  //       // Validate type
  //       if (!['n', 'p', 'd'].includes(type)) {
  //         return res.status(400).json({ message: `Invalid type: ${type}` });
  //       }
  
  //       // Initialize the array if the key doesn't exist
  //       if (!slot[type].has(key)) {
  //         slot[type].set(key, []);
  //       }
  
  //       const existingTickets = slot[type].get(key);
  
  //       // Check for duplicate dates
  //       if (hasDuplicateDate(existingTickets, ticket.date)) {
  //         return res.status(400).json({ message: `Duplicate date ${ticket.date} found for ${type.toUpperCase()}[${key}]` });
  //       }
  
  //       // Add the new ticket
  //       existingTickets.push(ticket);
  //       addedTickets.push(ticket);
  //     }
  
  //     // Save the updated slot
  //     await slot.save();
  
  //     // Respond with the updated slot and the tickets that were added
  //     res.status(200).json({ message: "Tickets added successfully", addedTickets, slot });
  //   } catch (error) {
  //     console.error("Error adding ticket to slot:", error);
  //     res.status(500).json({ message: "Server error", error: error.message || error });
  //   }
  // };
  // exports.deleteTickets = async (req, res) => {
  //   try {
  //     const { slotId } = req.params;
  //     const { key, type, ticketIndex } = req.body;
  
  //     const slot = await Slot.findById(slotId);
  //     if (!slot) return res.status(404).json({ message: "Slot not found" });
  
  //     if (slot[type].has(key)) {
  //       slot[type].get(key).splice(ticketIndex, 1);
  //       await slot.save();
  
  //       res.status(200).json({ message: "Ticket removed successfully", slot });
  //     } else {
  //       res.status(404).json({ message: `No tickets found for ${type.toUpperCase()}[${key}]` });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: "Server error", error });
  //   }
  // };
  const Ticket = require('../models/Ticket.js'); // Adjust path as needed
  
  // Date conflict checking function
  const checkDateConflict = (seatArray, newTicketDate) => {
    for (const ticket of seatArray) {
      if (new Date(ticket.date).getTime() === new Date(newTicketDate).getTime()) {
        return true; // Date conflict found
      }
    }
    return false; // No conflict
  };
  
  exports.bookTicket = async (req, res) => {
    const { screenId, slotId } = req.params;
    const { seatNumber, ticket } = req.body;
    const user_id = "66d9811e7835346b9b601af8"; // Assuming user ID for now
  
    try {
      // Validate input
      if (!slotId || !seatNumber || !ticket || !screenId || !user_id) {
        return res.status(400).json({ message: 'Missing required parameters' });
      }
  
      const { location, date, movieId, totalPrice, seats, total_seats_booked } = ticket;
  
      // Find the slot using slotId
      const slot = await Slot.findById(slotId);
      if (!slot) {
        return res.status(404).json({ message: 'Slot not found' });
      }
  
      // Check for date conflicts for each seat in seatNumber
      for (const section of Object.keys(seatNumber)) {
        if (slot[section]) {
          for (const seat of Object.keys(seatNumber[section])) {
            if (seatNumber[section][seat]) {
              const seatArray = slot[section].get(seat);
              if (seatArray && checkDateConflict(seatArray, date)) {
                return res.status(409).json({ message: `Seat ${section}${seat} is already booked for this date.` });
              }
            }
          }
        }
      }
  
      // No conflict: Proceed to create and save a new ticket
      const newTicket = new Ticket({
        slotId,
        user_id,
        location,
        date,
        movieId,
        totalPrice,
        seats,
        screenId,
        total_seats_booked
      });
  
      // Save the ticket
      await newTicket.save();
  
      // Prepare update object
      const update = {};
  
      // Loop through seatNumber and update each seat with full ticket details
      Object.keys(seatNumber).forEach(section => {
        if (slot[section]) {
          Object.keys(seatNumber[section]).forEach(seat => {
            if (seatNumber[section][seat]) {
              if (slot[section].has(seat)) {
                // If the seat exists, push the new ticket
                slot[section].get(seat).push(newTicket);
              } else {
                // Otherwise, initialize the seat with the new ticket
                slot[section].set(seat, [newTicket]);
              }
              update[section] = slot[section]; // Track updates
            }
          });
        }
      });
  
      // Apply the updates to the slot in the database
      if (Object.keys(update).length > 0) {
        await Slot.updateOne({ _id: slotId }, { $set: update });
      }
  
      // Respond with success
      res.status(200).json({ message: 'Booking successful', ticket: newTicket, update });
    } catch (error) {
      console.error("Error during booking:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  //ticket cancellation 
 
// 

// const Ticket = require('../models/Ticket.js');
// const Slot = require('../models/Slot.js')

exports.cancelTicket = async (req, res) => {
  const {  ticketId } = req.params;
  const user_id = "66d9811e7835346b9b601af8"; // Assuming user ID for now

  try {
    // Validate input
    if ( !ticketId) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Find the ticket to be canceled
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Ensure the ticket belongs to the current user
    if (ticket.user_id.toString() !== user_id) {
      return res.status(403).json({ message: 'Unauthorized to cancel this ticket' });
    }

    // Find the slot using slotId
    const {slotId } = ticket
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    const seats = ticket.seats.split(' '); // Seat info e.g. ["P3", "P4", "P5"]

    // Prepare update object to remove the ticket from the relevant seat sections
    const update = {};

    // Process each seat and remove the ticket from the slot's seat mapping (p, n, d)
    seats.forEach(seat => {
      const section = seat.charAt(0).toLowerCase(); // Extract section identifier (e.g. 'P' -> 'p')
      const seatNumber = seat.substring(1); // Extract seat number (e.g. 'P3' -> '3')

      // Ensure the section exists and remove the ticket from the specific seat array
      if (slot[section] && slot[section].has(seatNumber)) {
        const seatArray = slot[section].get(seatNumber);
        const updatedSeatArray = seatArray.filter(t => t._id.toString() !== ticketId);
        
        // If the array has changed, update the seat mapping
        if (updatedSeatArray.length !== seatArray.length) {
          slot[section].set(seatNumber, updatedSeatArray);
          update[section] = slot[section]; // Track updates for the slot
        }
      }
    });

    // Apply the updates to the slot in the database if changes occurred
    if (Object.keys(update).length > 0) {
      await Slot.updateOne({ _id: slotId }, { $set: update });
    }

    ticket.cancellation = true;
    await ticket.save();

    // Respond with success
    res.status(200).json({ message: 'Ticket canceled successfully' });
  } catch (error) {
    console.error("Error during cancellation:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
