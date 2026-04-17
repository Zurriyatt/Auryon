import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  fuserName: {
    type: String,
    required: true,
  },
  tuserName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  comments : {
    type : String , 
    required : true
  },
  sessionId: {
    type: String,
  },
  currency: {
    type: String,
    default: "USD",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Use existing model if it exists, otherwise create it
const Payment =
  mongoose.models.Payments || mongoose.model("Payments", paymentSchema);

export default Payment;
