import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/campus_events")
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("MongoDB error:", error));

const eventSchema = new mongoose.Schema({
    eventName: String,
    eventType: String,
    resourcePerson: String,
    eventDate: String,
    venue: String,
    maximumParticipants: Number,
    registrationStatus: String
});

const Event = mongoose.model("Event", eventSchema);

app.post("/api/events", async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: "Error adding event" });
    }
});

app.get("/api/events", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Error getting events" });
    }
});

app.get("/api/events/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Error getting event" });
    }
});

app.put("/api/events/:id", async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Error updating event" });
    }
});

app.delete("/api/events/:id", async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);

        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});