import { useEffect, useState } from "react";
import axios from "axios";
import EventForm from "./components/EventForm";
import "./App.css";

const API_URL = "http://localhost:5000/api/events";

function App() {
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState("");
    const [editingEvent, setEditingEvent] = useState(null);

    const getEvents = async () => {
        try {
            const response = await axios.get(API_URL);
            setEvents(response.data);
        } catch (error) {
            console.log(error);
            setMessage("Error loading events");
        }
    };

    const addEvent = async (event) => {
        try {
            await axios.post(API_URL, event);
            setMessage("Event added successfully");
            getEvents();
        } catch (error) {
            console.log(error);
            setMessage("Error adding event");
        }
    };

    const updateEvent = async (event) => {
        try {
            await axios.put(`${API_URL}/${event._id}`, event);
            setMessage("Event updated successfully");
            setEditingEvent(null);
            getEvents();
        } catch (error) {
            console.log(error);
            setMessage("Error updating event");
        }
    };

    const deleteEvent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) {
            return;
        }

        try {
            await axios.delete(`${API_URL}/${id}`);
            setMessage("Event deleted successfully");
            getEvents();
        } catch (error) {
            console.log(error);
            setMessage("Error deleting event");
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div className="app">
            <header className="header">
                <h1>Campus Event Management</h1>
                <p>Event Record Management</p>
            </header>

            <main className="container">
                <EventForm
                    addEvent={addEvent}
                    updateEvent={updateEvent}
                    editingEvent={editingEvent}
                />

                {message && (
                    <p className="message">{message}</p>
                )}

                <h2 className="records-title">Event Records</h2>

                {events.length === 0 ? (
                    <p className="no-events">No Events Available</p>
                ) : (
                    <div className="event-list">
                        {events.map((event) => (
                            <div className="event-card" key={event._id}>
                                <h3>{event.eventName}</h3>

                                <p>Type: {event.eventType}</p>
                                <p>Resource Person: {event.resourcePerson}</p>
                                <p>Date: {event.eventDate}</p>
                                <p>Venue: {event.venue}</p>
                                <p>Maximum Participants: {event.maximumParticipants}</p>
                                <p>Status: {event.registrationStatus}</p>

                                <div className="event-buttons">
                                    <button
                                        className="edit-button"
                                        onClick={() => setEditingEvent(event)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-button"
                                        onClick={() => deleteEvent(event._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;