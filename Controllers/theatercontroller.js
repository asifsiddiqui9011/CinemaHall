const Screen = require("../Models/Theater");
const User = require("../Models/User");

// Get all screens
exports.getAllScreens = async (req, res) => {
  try {
    const screens = await Screen.find();
    res.status(200).json(screens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single screen by ID
exports.getScreenById = async (req, res) => {
  try {
    const screen = await Screen.findById(req.params.id);
    if (!screen) return res.status(404).json({ message: "Screen not found" });
    res.status(200).json(screen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new screen
exports.createScreen = async (req, res) => {
  const screen = new Screen(req.body);
  try {
    const newScreen = await screen.save();
    res.status(201).json(newScreen);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a screen by ID
exports.updateScreen = async (req, res) => {
  try {
    const updatedScreen = await Screen.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedScreen)
      return res.status(404).json({ message: "Screen not found" });
    res.status(200).json(updatedScreen);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a screen by ID
exports.deleteScreen = async (req, res) => {
  try {
    const deletedScreen = await Screen.findByIdAndDelete(req.params.id);
    if (!deletedScreen)
      return res.status(404).json({ message: "Screen not found" });
    res.status(200).json({ message: "Screen deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bookSeats = async (req, res) => {
  const { screenId, slot, seatNumbers, movieMainId, date } = req.body;
  const userId = req.user.id;
  console.log(userId);

  // Validate the seatNumbers field
  if (!Array.isArray(seatNumbers) || seatNumbers.length === 0) {
    return res
      .status(400)
      .json({ message: "seatNumbers must be a non-empty array" });
  }

  try {
    const screen = await Screen.findOne({ mainId: screenId });

    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    const failedSeats = [];
    const bookedSeats = [];

    for (const seatNumber of seatNumbers) {
      const seat = screen.slots[slot].find((s) => s.seatNumber === seatNumber);

      if (!seat) {
        failedSeats.push({ seatNumber, message: "Seat not found" });
        continue;
      }

      if (seat.isBooked) {
        failedSeats.push({ seatNumber, message: "Seat already booked" });
        continue;
      }

      const updatedScreen = await Screen.findOneAndUpdate(
        { mainId: screenId, [`slots.${slot}.seatNumber`]: seatNumber },
        {
          $set: {
            [`slots.${slot}.$.isBooked`]: true,
            [`slots.${slot}.$.userId`]: userId,
            [`slots.${slot}.$.movieMainId`]: movieMainId,
            [`slots.${slot}.$.date`]: date,
          },
          $inc: { numberOfBookings: 1 },
        },
        { new: true }
      );

      if (updatedScreen) {
        const updatedSeat = updatedScreen.slots[slot].find(
          (s) => s.seatNumber === seatNumber
        );
        bookedSeats.push(updatedSeat);
      }
    }

    if (failedSeats.length > 0) {
      return res.status(400).json({
        message: "Some seats could not be booked",
        failedSeats,
        bookedSeats,
      });
    }

    // Update user bookings
    const user = await User.findById(userId);
    console.log(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookingDetails = {
      seatnumbers: seatNumbers,
      numberOfPersons: seatNumbers.length,
      theatername: screen.name,
      timing: slot,
      date: date,
    };

    // Check if the user already has bookings for the same date and slot
    const existingBooking = user.bookings.find(
      (b) => b.date.toISOString() === date.toISOString() && b.timing === slot
    );

    if (existingBooking) {
      // Update existing booking
      existingBooking.seatnumbers = seatNumbers;
      existingBooking.numberOfPersons = seatNumbers.length;
      existingBooking.theatername = screen.name;
      existingBooking.timing = slot;
      existingBooking.date = date;
    } else {
      // Add new booking
      user.bookings.push(bookingDetails);
    }

    await user.save();

    res.status(200).json({
      message: "All seats booked successfully and user bookings updated",
      bookedSeats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
