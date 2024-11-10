const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const path = require('path')
const userRoutes = require("./Router/userroutes");
const movieRoutes = require("./Router/moviesrouter");
const screenRoutes = require("./Router/theaterroutes");
const ticketRoutes = require("./Router/ticketroutes");
const slotRoutes = require('./Router/slotRoute')
const jwt = require('jsonwebtoken')
const cors = require("cors")



const adminUserRoutes = require("./Router/adminUserRoutes");
const app = express();


const PORT = (process.env.PORT || 4000)
app.use(express.json());
app.use(cors())
const mongoDBURL = process.env.DATABASE_URL;
mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


app.use("/api", userRoutes);
app.use("/api", movieRoutes);
app.use("/api", screenRoutes);
app.use("/api", ticketRoutes);
app.use("/api", adminUserRoutes);
app.use('/api',slotRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
