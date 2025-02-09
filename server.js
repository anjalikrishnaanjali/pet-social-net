npm init -y
npm install express mongoose cors body-parser
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/pet_social_network', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Check if MongoDB is connected
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema for Pet profiles
const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  description: String,
  image: String,
});

// Create a model based on the schema
const Pet = mongoose.model('Pet', petSchema);

// Routes
// Endpoint to get all pets
app.get('/api/pets', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to add a new pet
app.post('/api/pets', async (req, res) => {
  const pet = new Pet({
    name: req.body.name,
    breed: req.body.breed,
    age: req.body.age,
    description: req.body.description,
    image: req.body.image,
  });

  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});
node server.js
node server.js
app.get('/api/pets', async (req, res) => {
    const { name, breed } = req.query;  // Capture search parameters from query string

    try {
        // Build search criteria
        let searchCriteria = {};

        if (name) {
            searchCriteria.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        }

        if (breed) {
            searchCriteria.breed = { $regex: breed, $options: 'i' }; // Case-insensitive search
        }

        // Search pets based on the criteria
        const pets = await Pet.find(searchCriteria);
        res.json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
node server.js
