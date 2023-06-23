// we have created this popualate.js file to fill in the database with some data..this is not a server but just a js file for connection and insertion of elements dynamically instead of manually one by one
// we will run this file once only and the command for that is node populate.js (note that we dont use nodemon to run this file)
require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product"); // getting the schema
const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`success`);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    process.exit(0); // this means that if we are successful then exit the process with status code 0 which meanns success
  } catch (error) {
    console.log(`error: ${error}`);
    process.exit(1);
  }
};
start();
