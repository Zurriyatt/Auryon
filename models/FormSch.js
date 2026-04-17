import mongoose from "mongoose";

const FormSch = new mongoose.Schema({
  email : {type : String,
    required : true
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://i.pinimg.com/736x/35/84/7c/35847cb5d284b0056487456c26330d95.jpg",
  },
  coverImage: {
    type: String,
    default:
      "https://512pixels.net/downloads/macos-wallpapers-thumbs/10-14-Night-Thumb.jpg",
  },
  aboutyou: {
    type: String,
    default: "Hey, I  am an Auryon user, Boost my AURA",
  },
  userName: { type: String, required: true , unique : true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.models.formSch || mongoose.model("formSch", FormSch);
