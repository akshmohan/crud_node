const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
// const { error } = require("console");
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updates");
});

//GET ALL ITEMS
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET AN ITEM BY ID
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//CREATE AN ITEM
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//UPDATE AN ITEM
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE AN ITEM
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ messae: "Product Not Found!" });
    }

    res.status(200).json({ messae: "Product Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//CONNECT TO MONGODB
mongoose
  .connect(
    "mongodb+srv://akshaymohancareer:gxGHLflCqvgpQ6mq@backenddb.v410c.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to the Database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
