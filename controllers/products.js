const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  //console.log(req.query);
  // const products = await Product.find(req.query); // as req.query gives an object so we can pass it directlyto find method
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {}; // empty object
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  // if (name) {
  //   queryObject.name = name;
  // }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  console.log(queryObject.featured);
  let results = Product.find(queryObject);
  if (sort) {
    let sortdata = sort.split(",").join(" ");
    results = results.sort(sortdata);
  } else {
    results = results.sort("createdAt");
  }
  if (fields) {
    let fieldsdata = fields.split(",").join(" ");
    results = results.select(fieldsdata);
  }
  const products = await results;
  res.status(200).json({ products });
};

const getAllProductsStatic = async (req, res) => {
  /*throw new Error(
    "testing purposes only for the async error handler built in package"
  );*/ // instead of using a try catch block as we used to do initially we can use this inbuilt that does all the work for us
  const search = "ab";
  // const products = await Product.find({
  //   name: { $regex: search, $options: "i" }, // regex helps in finding all with "ab" prsent in the string....the "i" in options is for making search case insensitive
  // });
  //const products = await Product.find({}).sort("-name price");
  const products = await Product.find({}).select("name price");
  res.status(200).json({ products, number: products.length });
};
module.exports = { getAllProducts, getAllProductsStatic }; // exporting to routes
