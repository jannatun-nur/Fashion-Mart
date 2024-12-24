
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = "mongodb+srv://fashion-mart:fKR77pj7P2Ihby7T@cluster0.mrivhtb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function connectToDB() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        console.log("Connected to MongoDB!");


        const allPackagesDB = client.db("fashion-mart");
        allproductCollection = allPackagesDB.collection('allproductCollection')
        allapproveCollection = allPackagesDB.collection('allapproveCollection')


    // PRODUCT ORDER POST METHOD
    app.post('/order' , async( req , res)=>{
        const postData = req.body
        const result = await allproductCollection.insertOne(postData)
        res.send(result)
    })

// GET METHOD

app.get("/order", async (req, res) =>{
    const ordersCursor = allproductCollection.find(); 
const orders = await ordersCursor.toArray();
res.send(orders)
})


// --------------------------------------------------------------------------------------
// ADMIN SECTION API

// DELETE METHOD

app.delete('/order/:id' , async( req , res)=>{
    const id = req.params.id
    const query = {_id: new ObjectId(id)}
    const result = await allproductCollection.deleteOne(query)
    res.send(result)

})


// APPROVE ORDER

app.put("/order/:id", async (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;
    const result = await allproductCollection.updateOne(
        { _id: new ObjectId(productId) },
        { $set: updatedData }
      );
      res.json(result);
 
})

// PRODUCT SEARCH

app.get('/search/category/:category', async (req, res) => {
    const category = req.params.category; // Use route parameter instead of query parameter

    try {
        // Fetch data from the Fake Store API
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();

        // Filter products based on the category
        const filteredProducts = products.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );

        if (filteredProducts.length > 0) {
            // Send the filtered products
            res.json(filteredProducts);
        } else {
            // Send an empty array or a message indicating no products found
            res.status(404).json({ message: "No products found for this category." });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("An error occurred while fetching data.");
    }
});




    }
    
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}





app.get("/", (req, res) => {
    res.send("MongoDB connected successfully");
});



// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectToDB(); // Ensure MongoDB connection is established before starting the server
    console.log(`Server running on port ${PORT}`);
});


