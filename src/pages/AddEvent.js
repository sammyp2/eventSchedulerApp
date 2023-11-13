import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/addEvent.css';

function AddEvent() {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventCapacity, setEventCapacity] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');

  const navigate = useNavigate();

  const handleAddEventSubmit = (event) => {
    event.preventDefault();

    const newEvent = {
      name: eventName,
      description: eventDescription,
      location: eventLocation,
      eventCapacity: parseInt(eventCapacity),
      startDate: eventStartDate,
      endDate: eventEndDate,
      startTime: eventStartTime,
      endTime: eventEndTime,
    };

    axios
      .post('http://localhost:8080/events/createEvent', newEvent)
      .then((response) => {
        console.log(response.data);
        navigate('/events');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="add-property-content">
      <h2>Add New Event</h2>
      <form onSubmit={handleAddEventSubmit}>
        <div>
          Event Name:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          Event Description:
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
        </div>
        <div>
          Event Location:
          <input
            type="text"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            required
          />
        </div>
        <div>
          Event Capacity:
          <input
            type="number"
            value={eventCapacity}
            onChange={(e) => setEventCapacity(e.target.value)}
            required
          />
        </div>
        <div>
          Start Date:
          <input
            type="date"
            value={eventStartDate}
            onChange={(e) => setEventStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          End Date:
          <input
            type="date"
            value={eventEndDate}
            onChange={(e) => setEventEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          Start Time:
          <input
            type="time"
            value={eventStartTime}
            onChange={(e) => setEventStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          End Time:
          <input
            type="time"
            value={eventEndTime}
            onChange={(e) => setEventEndTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Event</button>
      </form>
    </div>
  );
}

export default AddEvent;