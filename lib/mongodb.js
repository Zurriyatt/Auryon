import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log("Mongo DB pehle se hi laga wa hai");
    return;
  }
  try {
    const DBURI = process.env.MONGO_URI;
    if(!DBURI) { throw new Error ("MONGO URI MISSING")}
    await mongoose.connect(DBURI, {
      dbName: "Auryon-Acc",
    });
    isConnected = true;
    console.log("Mongo db connected Successfully")
  } catch (err) {
    console.log(err, "MONGODB Connection error");
  }
}
