import React, { useState } from 'react';
import '../css/signin.css';
import '../css/positions.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

function SignUp(props) {
  const [userType, setUserType] = useState('USER'); // Default userType is 'USER'

  const navigator = useNavigate();

  const signUpChangeHandler = (event) => {
    const { name, value } = event.target;
    const tempUser = { ...props.user };
    tempUser[name] = value;
    props.setUser(tempUser);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const signUpSubmitHandler = () => {
    const newUser = {
      ...props.user,
      userType: userType,
    };

    axios
      .post('http://localhost:8080/users/signup', newUser)
      .then((response) => {
        localStorage.setItem('id', response.data.id);
        props.setUser(response.data);
        navigator('/');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className='signup-signin-content'>
      <div className='sign-up-box'>
        <div>New User? Sign-up Today!</div>
        <h1>Sign-Up</h1>
        <div className='flex-row justify-content-left'>
          EMAIL
          <input
            className='input-container'
            value={props.user.email}
            name='email'
            type='email'
            onChange={signUpChangeHandler}
          ></input>
        </div>
        <div className='flex-row justify-content-left'>
          PASSWORD
          <input
            className='input-container'
            value={props.user.rawPassword}
            name='rawPassword'
            type='password'
            onChange={signUpChangeHandler}
          ></input>
        </div>
        <div className='flex-row justify-content-left'>
          USERNAME
          <input
            className='input-container'
            value={props.user.username}
            name='username'
            type='text'
            onChange={signUpChangeHandler}
          ></input>
        </div>
        <div className='flex-row justify-content-center'>
          <label>
            <input
              type='radio'
              name='userType'
              value='USER'
              checked={userType === 'USER'}
              onChange={handleUserTypeChange}
            />
            User
          </label>
          <label>
            <input
              type='radio'
              name='userType'
              value='ADMIN'
              checked={userType === 'ADMIN'}
              onChange={handleUserTypeChange}
            />
            Admin
          </label>
        </div>
        <div className='flex-row justify-content-center'>
          <button onClick={signUpSubmitHandler}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;