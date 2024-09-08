const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./Router/userroutes");
const movieRoutes = require("./Router/moviesrouter");
const screenRoutes = require("./Router/theaterroutes");
const ticketRoutes = require("./Router/ticketroutes");
const slotRoutes = require('./Router/slotRoute')
const jwt = require('jsonwebtoken')
const cors = require("cors")


const adminUserRoutes = require("./Router/adminUserRoutes");
const app = express();

// Set the port to 4000
const PORT = 4000;
app.use(express.json());
app.use(cors())
const mongoDBURL =
  "mongodb+srv://asifsiddiqui9011:w4HFuJgk3mMgOukQ@cluster0.61qhz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Connect to MongoDB
mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// all routes
app.use("/api", userRoutes);
app.use("/api", movieRoutes);
app.use("/api", screenRoutes);
app.use("/api", ticketRoutes);
app.use("/api", adminUserRoutes);
app.use('/api',slotRoutes);

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
