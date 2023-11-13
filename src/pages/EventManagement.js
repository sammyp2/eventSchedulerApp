import React, { useState, useEffect } from 'react';
import '../css/positions.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import EventBox from '../reuse/EventBox'; // Make sure to import the appropriate component for rendering events
import '../css/admin.css';

function EventManagement(props) {
  const [events, setEvents] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const addEventSubmitHandler = () => {
    navigator('/AddEvent');
  };

  const findEventSubmitHandler = () => {
    axios.get(`http://localhost:8080/users/${props.user.id}/events`)
      .then((response) => {
        console.log("response data", response.data)
        setEvents(response.data);
      }
      )
      .catch((e) => {
        console.log(e);
      })
  };

  const handleEventClick = (event) => {
    navigator('/EditEvent', { state: { event } });
  };
  
  const placeholderimg = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.insomniac.com%2Fevents%2F&psig=AOvVaw33IsP4M2WnILeefYp0Aq7w&ust=1692309891490000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCNCmpOGX4oADFQAAAAAdAAAAABAE";

  const showEvents = () => {
    return events.map((event) => (
      <div
        className='event-box'
        key={event.id}
        onClick={() => handleEventClick(event)}
      >
        Click To View Details
        <img src = {placeholderimg} alt = "Meeting img"></img>
      </div>
    ));
  };



  return (
    <div className='fill'>
      <div className='flex-column admin-sidebar justify-content-center'>
        <h2>Hello Admin</h2>
        <h1>MANAGE EVENTS</h1>
        <h2>Find All</h2>
        <button onClick={findEventSubmitHandler}>SEE MY EVENTS</button>
        <button onClick={addEventSubmitHandler}>ADD NEW EVENT</button>
      </div>
      <div className='flex-column fill'>{showEvents()}</div>
    </div>
  );
}

export default EventManagement;