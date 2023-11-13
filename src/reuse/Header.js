import React from 'react';
import '../css/header.css';
import '../css/positions.css';
import { useNavigate, Link } from 'react-router-dom';

function Header(props) {
  const navigator = useNavigate();

  const signOut = () => {
    localStorage.removeItem('userId');
    props.setUser({
      id: undefined,
      email: '',
      rawPassword: '',
      UserType: 'USER',
    });
    navigator('/');
  };

  const renderHeader = () => {
    if (props.user.id !== undefined) {
      return (
        <div className='header-container'>
          <div className='third-width'>
            <Link to='/'>
              <img
                className='third-width'
                src='https://static.showit.co/200/Aj-BwGa5SbSI6HPGewnROw/121572/screen_shot_2021-05-13_at_11_00_33_pm.png'
                alt='Logo'
              />
            </Link>
          </div>
          <div className='third-width'>
            <Link to='/'>HOME</Link>
          </div>
          <div className='third-width'>
              <Link to='/EventManagement'>EVENT MANAGEMENT</Link>
            </div>
          {props.user.UserType ? (
            <div className='third-width'>
              <Link to='/EventManagement'>Event Management</Link>
            </div>
          ) : (
            <div className='third-width'>
              <Link to='/Events'>EVENTS</Link>
            </div>
          )}
          <div className='third-width' onClick={signOut}>
            Sign Out
          </div>
        </div>
      );
    } else {
      return (
        <div className='header-container'>
          <div className='third-width'>
            <Link to='/'>
              <img
                className='third-width'
                src='https://static.showit.co/200/Aj-BwGa5SbSI6HPGewnROw/121572/screen_shot_2021-05-13_at_11_00_33_pm.png'
                alt='Logo'
              />
            </Link>
          </div>
          <div className='third-width'>
            <Link to='/'>HOME</Link>
          </div>
          <div className='third-width'>
            <Link to='/sign-in'>SIGN-IN</Link>
          </div>
          <div className='third-width'>
            <Link to='/sign-up'>SIGN-UP</Link>
          </div>
        </div>
      );
    }
  };

  return <div>{renderHeader()}</div>;
}

export default Header;