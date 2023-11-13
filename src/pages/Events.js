import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import EventBox from '../reuse/EventBox';
import '../css/events.css';
import { useNavigate } from 'react-router-dom';

function Events(props) {
  const [events, setEvents] = useState([]);
  const [searchType, setSearchType] = useState('findAll');
  const [searchValue, setSearchValue] = useState('');

  const loadEvents = useCallback(() => {
    let url = "http://localhost:8080/events/findAll";

    if (searchType === 'findByLocation') {
      url = `http://localhost:8080/events/findEventByLocation/${searchValue}`;
    } else if (searchType === 'findByName') {
      url = `http://localhost:8080/events/findEventByName/${searchValue}`;
    }

    axios
      .get(url)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchType, searchValue]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    loadEvents();
  };

  const navigate = useNavigate();

  const navigateToAddEvent = () => {
    navigate('/addEvent');
  };

  const navigateToEditEvent = () => {
    navigate('/editEvent');
  };

  const renderEvents = () => {
    return (
      <div className="events">
        {events.map((event) => (
          <div key={event.id} className="event-box">
            <EventBox event={event} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='event-list'>
      <div className='event-options'>
        <button onClick={navigateToAddEvent}>Add Event</button>
        <button onClick={navigateToEditEvent}>Edit Event</button>
      </div>
      <form onSubmit={handleSearchSubmit}>
        <select value={searchType} onChange={handleSearchTypeChange}>
          <option value='findAll'>Show All Events</option>
          <option value='findByLocation'>Search by Location</option>
          <option value='findByName'>Search by Name</option>
        </select>
        {searchType !== 'findAll' && (
          <input
            type='text'
            value={searchValue}
            onChange={handleSearchValueChange}
            placeholder={`Search by ${searchType === 'findByLocation' ? 'Location' : 'Name'}`}
          />
        )}
        <button type='submit'>Search</button>
      </form>
      {renderEvents()}
    </div>
  );
}

export default Events;