const mongoose = require("mongoose");
const ticketSchema = require('./Ticket.js')




const slotSchema = new mongoose.Schema({
  start:{
    type:String,
    required:true
  },
  end:{
    type:String,
    required:true
  },
  theater_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen",
    required: true,
  },
  movieId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Movie",
    default:""
  },
  n: {
    type: Map,
    of: [ticketSchema.schema],
    default:{}
  },
  p: {
    type: Map,
    of: [ticketSchema.schema],
    default:{}
  },
  d: {
    type: Map,
    of: [ticketSchema.schema],
    default:{}
  }
});

module.exports = mongoose.model("slot", slotSchema);
