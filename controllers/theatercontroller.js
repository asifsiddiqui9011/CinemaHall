const Screen = require("../models/Theater");

exports.getAllScreens = async (req, res) => {
  try {
    const screens = await Screen.find().populate("slot");
    res.status(200).json(screens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getScreenById = async (req, res) => {
  try {
    const screen = await Screen.findById(req.params.id).populate("slot");
    if (!screen) return res.status(404).json({ message: "Screen not found" });
    res.status(200).json(screen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOwnerScreens = async (req, res) => {
  try {
    const userId = req.user.userId;
    const screen = await Screen.find({userName:userId}).populate({
      path: "slot",
      populate: {
          path: "movieId", // Assuming movieId is the field inside slot that references Movie model
          model: "Movie",   // Ensure this matches the actual Movie model name in your database
          select: "_id movieName genre language videoDimension" // Select only the fields you need
      }
  });
    if (!screen) return res.status(404).json({ message: "Screen not found" });
    res.status(200).json(screen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


function generateMainId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

exports.createScreen = async (req, res) => {

  const userName = req.user.userId;
  console.log(userName,"userid")
  const screenData = { ...req.body, mainId: generateMainId(),userName}; 
  const screen = new Screen(screenData);

  try {
    const newScreen = await screen.save();
    res.status(201).json(newScreen);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateScreen = async (req, res) => {
  try {
    const userName = req.user.userId;
    const updatedScreen = await Screen.findByIdAndUpdate(
      req.params.id,
     {...req.body, userName},
      { new: true }
    );
    if (!updatedScreen)
      return res.status(404).json({ message: "Screen not found" });
    res.status(200).json(updatedScreen);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


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

    const existingBooking = user.bookings.find(
      (b) => b.date.toISOString() === date.toISOString() && b.timing === slot
    );

    if (existingBooking) {
    
      existingBooking.seatnumbers = seatNumbers;
      existingBooking.numberOfPersons = seatNumbers.length;
      existingBooking.theatername = screen.name;
      existingBooking.timing = slot;
      existingBooking.date = date;
    } else {
    
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
