//console.log('04 Store API')
require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1>Store API</h1> <a href='/api/v1/products'>LINK</a>");
});
app.use("/api/v1/products", productsRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`server is listening on ${PORT}`));
  } catch (error) {
    console.log(`err connecting to the database: ${error.message}`);
  }
};
start();
