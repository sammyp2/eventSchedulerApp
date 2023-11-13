import React, { useState } from 'react';
import Header from '../reuse/Header';
import '../css/positions.css';
import '../css/home.css';

function Home(props) {
console.log("USER ID", props.user.id);

  return (

      <div className="home-content">
        <div className="welcome-box">
          <h1>Welcome to the Event Scheduler App</h1>
          <p>Plan and manage your events with ease!</p>
        </div>
      </div>

  );
}

export default Home;