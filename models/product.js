const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `please provide a name for this`],
  },
  price: {
    type: Number,
    required: [true, `please provide a price for this`],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    //enum:['ikea','liddy','caressa','marcos']
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    }, // enum limits the options available
  },
});

module.exports = mongoose.model("Product", productSchema);
