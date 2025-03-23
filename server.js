const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve index.html as the default page
app.use(express.static(path.join(__dirname)));

// Connect to MongoDB (Replace `<password>` with your actual password)
mongoose.connect("mongodb+srv://krishnabk0803:keshika0803@cluster0.5jw6k.mongodb.net/database", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Schema
const busSchema = new mongoose.Schema({
    busName: String,
    start: String,
    end: String,
    time: String
});

// Create Model (linked to "collection" in MongoDB)
const Bus = mongoose.model("Bus", busSchema, "collection");

// API: Fetch buses matching start and end locations
app.get("/search", async (req, res) => {
    const { start, end } = req.query;

    try {
        const buses = await Bus.find({ start: start, end: end });

        if (buses.length === 0) {
            return res.json({ message: "No matching buses found." });
        }

        res.json(buses);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start Server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
