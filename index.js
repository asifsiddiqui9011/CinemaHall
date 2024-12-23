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
const multer = require("multer");
const {storage} = require('./cloudConfig')
const cors = require("cors")



const adminUserRoutes = require("./Router/adminUserRoutes");
const app = express();


const PORT = (process.env.PORT || 4000)
app.use(express.json());
app.use(cors())
const mongoDBURL = process.env.DATABASE_URL;
mongoose
  .connect(mongoDBURL, {})
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

//Image Storage
// const storage = multer.diskStorage({
//   destination: './upload/images',
//   filename:(req,file,cb)=>{
//       return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//   }
// })


const upload = multer({ storage: storage });

app.post("/upload", upload.array('newMovie', 3), (req, res, next) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({ success: 0, message: 'No files were uploaded.' });
  }
  const imageUrls = files.map(file => file.path);
  console.log(imageUrls, "imageUrls");
  res.json({ success: 1, image_urls: imageUrls,file:files });
});
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 1024 * 1024 * 5 } // 5MB file size limit
// });

// app.use('/images', express.static('upload/images'));

// app.post("/upload", upload.array('newMovie', 3), (req, res, next) => {
//   const files = req.files;
//   if (!files || files.length === 0) {
//     return res.status(400).json({ success: 0, message: 'No files were uploaded.' });
//   }
//   const imageUrls = files.map(file => `http://localhost:${PORT}/images/${file.filename}`);
//   console.log(imageUrls, "imageUrls");
//   res.json({ success: 1, image_urls: imageUrls });
// });



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
