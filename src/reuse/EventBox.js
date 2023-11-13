import React from 'react';
import '../css/events.css';

function EventBox(props) {
  return (
    <div className='event-box'>
      <div className='event-name'>Event Name: {props.event.name}</div>
      <div>Location: {props.event.location}</div>
      <div>Start Date: {props.event.startDate}</div>
      <div>End Date: {props.event.endDate}</div>
      <div>Start Time: {props.event.startTime}</div>
      <div>End Time: {props.event.endTime}</div>
      <div>Capacity: {props.event.capacity}</div>
      <div>Available Slots: {props.event.availableSlots}</div>
      <div className='event-description'>Description: {props.event.description}</div>
      <div className='event-subevents'>Subevents:</div>
      {/* {props.event.subevents.map((subevent) => (
        <div key={subevent.id}>
          <div>Subevent Name: {subevent.name}</div>
          <div>Location: {subevent.location}</div>
          <div>Date: {subevent.date}</div>
          <div>Time: {subevent.time}</div>
          <div>Capacity: {subevent.capacity}</div>
          <div>Available Slots: {subevent.availableSlots}</div>
        </div>
      ))} */}
    </div>
  );
}

export default EventBox;