const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

// Connection URI for MongoDB Atlas
const uri = "mongodb+srv://riya:riya123@cluster0.9njiabz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// Parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/forms.html");
});

// Handle form submission
app.post("/submit", async (req, res) => {
  const { name, phone_number, stock_name, num_stocks_purchased } = req.body;

  try {
    // Connect to MongoDB Atlas
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    

    // Access the database and collection
    const database = client.db("your_database_name");
    const collection = database.collection("your_collection_name");

    // Insert the form data into the collection
    await collection.insertOne({
      name,
      phone_number,
      stock_name,
      num_stocks_purchased: parseInt(num_stocks_purchased),
    });

    // Close the connection
    await client.close();

    // Respond with a success message
    res.send("Stock data is saved in to your database!");
  } catch (error) {
    console.error("Error occurred while processing form submission:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
