import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/events.css';

function EditEvent(props) {
  const location = useLocation();
  const { event } = location.state || {};
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [subevents, setSubevents] = useState([]);
  const [newScheduleStartTime, setNewScheduleStartTime] = useState('');
  const [newScheduleEndTime, setNewScheduleEndTime] = useState('');
  const [newSubeventName, setNewSubeventName] = useState('');
  const [newSubeventDate, setNewSubeventDate] = useState('');
  const navigate = useNavigate();

  const handleUpdateEvent = () => {
    const updatedEvent = {
      ...(event || {}),
      eventName,
      eventDate,
      eventLocation,
      schedules,
      subevents,
    };

    if (event) {
      axios
        .put(`http://localhost:8080/events/updateEvent/${event.id}`, updatedEvent)
        .then(() => {
          navigate('/events');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleAddSchedule = () => {
    const newSchedule = { startTime: newScheduleStartTime, endTime: newScheduleEndTime };
    setSchedules([...schedules, newSchedule]);
    setNewScheduleStartTime('');
    setNewScheduleEndTime('');
  };

  const handleAddSubevent = () => {
    const newSubevent = { subeventName: newSubeventName, subeventDate: newSubeventDate };
    setSubevents([...subevents, newSubevent]);
    setNewSubeventName('');
    setNewSubeventDate('');
  };

  useEffect(() => {
    if (event) {
      setEventName(event.eventName);
      setEventDate(event.eventDate);
      setEventLocation(event.eventLocation);
      setSchedules(event.schedules);
      setSubevents(event.subevents);
    }
  }, [event]);

  return (
    <div className="edit-event-container">
      <h2>Edit Event</h2>
      <form>
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
          Event Date:
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
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
        <h3>Edit Schedules:</h3>
        <ul>
          {schedules.map((schedule, index) => (
            <li key={index}>
              {schedule.startTime} - {schedule.endTime}
            </li>
          ))}
        </ul>
        <div>
          New Schedule Start Time:
          <input
            type="time"
            value={newScheduleStartTime}
            onChange={(e) => setNewScheduleStartTime(e.target.value)}
          />
        </div>
        <div>
          New Schedule End Time:
          <input
            type="time"
            value={newScheduleEndTime}
            onChange={(e) => setNewScheduleEndTime(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleAddSchedule}>
          Add Schedule
        </button>
        <h3>Edit Subevents:</h3>
        <ul>
          {subevents.map((subevent, index) => (
            <li key={index}>
              {subevent.subeventName} - {subevent.subeventDate}
            </li>
          ))}
        </ul>
        <div>
          New Subevent Name:
          <input
            type="text"
            value={newSubeventName}
            onChange={(e) => setNewSubeventName(e.target.value)}
          />
        </div>
        <div>
          New Subevent Date:
          <input
            type="date"
            value={newSubeventDate}
            onChange={(e) => setNewSubeventDate(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleAddSubevent}>
          Add Subevent
        </button>
        <button type="button" onClick={handleUpdateEvent}>
          Update Event
        </button>
      </form>
    </div>
  );
}

export default EditEvent;