
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
  
    const { slotId, theater_id } = req.query;

    
    if (!slotId || !theater_id) {
      return res.status(400).json({ message: "Invalid slot ID or theater ID" });
    }

    
    const slotToDelete = await Slot.findById(slotId).populate('theater_id');

 
    if (!slotToDelete) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slotToDelete.theater_id._id.toString() !== theater_id) {
      return res.status(400).json({ message: "Slot and theater ID mismatch" });
    }

    await Screen.findByIdAndUpdate(
      theater_id,
      { $pull: { slot: slotId } },
      { new: true } 
    );


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
  
  
 
  // const Ticket = require('../models/Ticket.js'); 
  
  
  // const checkDateConflict = (seatArray, newTicketDate) => {
  //   for (const ticket of seatArray) {
  //     if (new Date(ticket.date).getTime() === new Date(newTicketDate).getTime()) {
  //       return true; 
  //     }
  //   }
  //   return false; 
  // };
  
  // exports.bookTicket = async (req, res) => {
  //   const { movieId,screenId, slotId } = req.params;
  //   const { seatNumber, ticket } = req.body;
  //   const user_id = "66d9811e7835346b9b601af8"; 
  
  //   try {
     
  //     if (!slotId || !seatNumber || !ticket || !screenId || !user_id) {
  //       return res.status(400).json({ message: 'Missing required parameters' });
  //     }
  
  //     const { city, date, totalPrice, seats, total_seats_booked } = ticket;
  
  //     const slot = await Slot.findById(slotId);
  //     if (!slot) {
  //       return res.status(404).json({ message: 'Slot not found' });
  //     }
  
      
  //     for (const section of Object.keys(seatNumber)) {
  //       if (slot[section]) {
  //         for (const seat of Object.keys(seatNumber[section])) {
  //           if (seatNumber[section][seat]) {
  //             const seatArray = slot[section].get(seat);
  //             if (seatArray && checkDateConflict(seatArray, date)) {
  //               return res.status(409).json({ message: `Seat ${section}${seat} is already booked for this date.` });
  //             }
  //           }
  //         }
  //       }
  //     }
  
   
  //     const newTicket = new Ticket({
  //       slotId,
  //       user_id,
  //       location:city,
  //       date,
  //       movieId,
  //       totalPrice,
  //       seats,
  //       screenId,
  //       total_seats_booked
  //     });
  
    
  //     await newTicket.save();
  
      
  //     const update = {};
  
      
  //     Object.keys(seatNumber).forEach(section => {
  //       if (slot[section]) {
  //         Object.keys(seatNumber[section]).forEach(seat => {
  //           if (seatNumber[section][seat]) {
  //             if (slot[section].has(seat)) {
               
  //               slot[section].get(seat).push(newTicket);
  //             } else {
               
  //               slot[section].set(seat, [newTicket]);
  //             }
  //             update[section] = slot[section]; 
  //           }
  //         });
  //       }
  //     });
  
    
  //     if (Object.keys(update).length > 0) {
  //       await Slot.updateOne({ _id: slotId }, { $set: update });
  //     }
  
   
  //     res.status(200).json({ message: 'Booking successful', ticket: newTicket, update });
  //   } catch (error) {
  //     console.error("Error during booking:", error);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // };
  
  const Ticket = require('../models/Ticket.js');
  
  // Helper function to check if there is a date conflict for a specific seat
  const checkDateConflict = (seatArray, newTicketDate) => {
    for (const ticket of seatArray) {
      if (new Date(ticket.date).getTime() === new Date(newTicketDate).getTime()) {
        return true; // Conflict found
      }
    }
    return false; // No conflict
  };
  
  exports.bookTicket = async (req, res) => {
    const { movieId, screenId, slotId } = req.params;
    const { ticket } = req.body;
    const user_id = req.user.id; // Placeholder user_id
  
    try {
      if (!slotId || !ticket || !screenId || !user_id) {
        return res.status(400).json({ message: 'Missing required parameters' });
      }
  
      const { date, totalPrice, seats, total_seats_booked } = ticket;
  
      // Fetch the slot using slotId
      const slot = await Slot.findById(slotId);
      if (!slot) {
        return res.status(404).json({ message: 'Slot not found' });
      }
  
      // Loop over each seat in the ticket and validate booking
      for (const seat of seats) {
        const section = seat[0].toLowerCase(); // First character as section (lowercase)
        const seatNumber = seat.slice(1); // Seat number part (e.g., '0', '1')
  
        if (slot[section]) {
          const seatArray = slot[section].get(seatNumber);
          if (seatArray && checkDateConflict(seatArray, date)) {
            return res.status(409).json({ message: `Seat ${seat} is already booked for this date.` });
          }
        } else {
          return res.status(400).json({ message: `Invalid seat section ${section}` });
        }
      }
  
      // Create a new ticket
      const newTicket = new Ticket({
        slotId,
        user_id,
        date,
        movieId,
        totalPrice,
        seats,
        screenId,
        total_seats_booked,
      });
  
      // Save the new ticket in the database
      await newTicket.save();
  
      // Update slot with the new booking information
      const update = {};
      seats.forEach(seat => {
        const section = seat[0].toLowerCase(); // Ensure lowercase section
        const seatNumber = seat.slice(1); // Seat number part (e.g., '0')
  
        if (slot[section]) {
          if (slot[section].has(seatNumber)) {
            // Append the new ticket to the existing seat array
            slot[section].get(seatNumber).push(newTicket);
          } else {
            // Create a new entry for this seat
            slot[section].set(seatNumber, [newTicket]);
          }
          update[section] = slot[section]; // Mark section for update
        }
      });
  
      // Apply the slot update if any changes were made
      if (Object.keys(update).length > 0) {
        await Slot.updateOne({ _id: slotId }, { $set: update });
      }
  
      // Respond with success message and the new ticket
      res.status(200).json({ message: 'Booking successful', ticket: newTicket, update });
    } catch (error) {
      console.error("Error during booking:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
 

// exports.cancelTicket = async (req, res) => {
//   const {  ticketId } = req.params;
//   const user_id = "66d9811e7835346b9b601af8"; 

//   try {
    
//     if ( !ticketId) {
//       return res.status(400).json({ message: 'Missing required parameters' });
//     }

  
//     const ticket = await Ticket.findById(ticketId);
//     if (!ticket) {
//       return res.status(404).json({ message: 'Ticket not found' });
//     }

   
//     if (ticket.user_id.toString() !== user_id) {
//       return res.status(403).json({ message: 'Unauthorized to cancel this ticket' });
//     }

   
//     const {slotId } = ticket
//     const slot = await Slot.findById(slotId);
//     if (!slot) {
//       return res.status(404).json({ message: 'Slot not found' });
//     }

//     const seats = ticket.seats; 

   
//     const update = {};


//     seats.forEach(seat => {
//       const section = seat.charAt(0).toLowerCase(); 
//       const seatNumber = seat.substring(1); 

     
//       if (slot[section] && slot[section].has(seatNumber)) {
//         const seatArray = slot[section].get(seatNumber);
//         const updatedSeatArray = seatArray.filter(t => t._id.toString() !== ticketId);
        
        
//         if (updatedSeatArray.length !== seatArray.length) {
//           slot[section].set(seatNumber, updatedSeatArray);
//           update[section] = slot[section]; 
//         }
//       }
//     });

   
//     if (Object.keys(update).length > 0) {
//       await Slot.updateOne({ _id: slotId }, { $set: update });
//     }

//     ticket.cancellation = true;
//     await ticket.save();

//     // Respond with success
//     res.status(200).json({ message: 'Ticket canceled successfully' });
//   } catch (error) {
//     console.error("Error during cancellation:", error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


exports.cancelTicket = async (req, res) => {
  const { ticketId } = req.params;
  const user_id = req.user.id;
  
  try {
    // Check for required parameters
    if (!ticketId) {
      return res.status(400).json({ message: 'Missing ticket ID' });
    }

    // Find the ticket by its ID
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if the current user is authorized to cancel the ticket
    if (ticket.user_id.toString() !== user_id) {
      return res.status(403).json({ message: 'Unauthorized to cancel this ticket' });
    }

    // Find the corresponding slot using the slotId from the ticket
    const { slotId } = ticket;
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    const seats = ticket.seats; // Extract seats array from the ticket
    const update = {}; // To hold the updates for the slot

    // Loop over each seat in the ticket and update the slot accordingly
    seats.forEach(seat => {
      const section = seat.charAt(0).toLowerCase(); // First character as section (lowercase)
      const seatNumber = seat.substring(1); // Seat number part
      
      if (slot[section] && slot[section].has(seatNumber)) {
        const seatArray = slot[section].get(seatNumber);

        // Filter out the ticket from the seat array
        const updatedSeatArray = seatArray.filter(t => t._id.toString() !== ticketId);

        // Only update if there's a change (ticket was found in the array)
        if (updatedSeatArray.length !== seatArray.length) {
          slot[section].set(seatNumber, updatedSeatArray); // Update the seat array
          update[section] = slot[section]; // Mark the section for update
        }
      }
    });

    // Apply slot updates if any changes were made
    if (Object.keys(update).length > 0) {
      await Slot.updateOne({ _id: slotId }, { $set: update });
    }

    // Mark the ticket as canceled (soft delete)
    ticket.cancellation = true;
    await ticket.save();

    // Respond with success
    res.status(200).json({ message: 'Ticket canceled successfully' });
  } catch (error) {
    console.error("Error during cancellation:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
