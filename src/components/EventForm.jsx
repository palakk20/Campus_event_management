import { useEffect, useState } from "react";

function EventForm({ addEvent, updateEvent, editingEvent }) {
    const [eventName, setEventName] = useState("");
    const [eventType, setEventType] = useState("");
    const [resourcePerson, setResourcePerson] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [venue, setVenue] = useState("");
    const [maximumParticipants, setMaximumParticipants] = useState("");
    const [registrationStatus, setRegistrationStatus] = useState("Open");

    useEffect(() => {
        if (editingEvent) {
            setEventName(editingEvent.eventName);
            setEventType(editingEvent.eventType);
            setResourcePerson(editingEvent.resourcePerson);
            setEventDate(editingEvent.eventDate);
            setVenue(editingEvent.venue);
            setMaximumParticipants(editingEvent.maximumParticipants);
            setRegistrationStatus(editingEvent.registrationStatus);
        }
    }, [editingEvent]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!eventName || !eventDate || !maximumParticipants) {
            alert("Please fill all required fields");
            return;
        }

        if (maximumParticipants <= 0) {
            alert("Maximum participants must be positive");
            return;
        }

        const event = {
            eventName,
            eventType,
            resourcePerson,
            eventDate,
            venue,
            maximumParticipants,
            registrationStatus
        };

        if (editingEvent) {
            updateEvent({ ...event, _id: editingEvent._id });
        } else {
            addEvent(event);
        }

        setEventName("");
        setEventType("");
        setResourcePerson("");
        setEventDate("");
        setVenue("");
        setMaximumParticipants("");
        setRegistrationStatus("Open");
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>{editingEvent ? "Update Event" : "Add New Event"}</h2>

            <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
            />

            <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
            >
                <option value="">Select Event Type</option>
                <option value="Workshop">Workshop</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Seminar">Seminar</option>
                <option value="Masterclass">Masterclass</option>
                <option value="Competition">Competition</option>
            </select>

            <input
                type="text"
                placeholder="Resource Person"
                value={resourcePerson}
                onChange={(e) => setResourcePerson(e.target.value)}
            />

            <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
            />

            <input
                type="text"
                placeholder="Venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
            />

            <input
                type="number"
                placeholder="Maximum Participants"
                value={maximumParticipants}
                onChange={(e) => setMaximumParticipants(e.target.value)}
            />

            <select
                value={registrationStatus}
                onChange={(e) => setRegistrationStatus(e.target.value)}
            >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
            </select>

            <button type="submit">
                {editingEvent ? "Update Event" : "Add Event"}
            </button>
        </form>
    );
}

export default EventForm;