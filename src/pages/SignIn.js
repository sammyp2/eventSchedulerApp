import React, { useState } from 'react';
import '../css/positions.css';
import '../css/signin.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

function SignIn(props) {
  const [userInput, setUserInput] = useState('');
  const [rawPassword, setRawPassword] = useState('');
  const navigator = useNavigate();

  const signInChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === 'userInput') {
      setUserInput(value);
    } else if (name === 'rawPassword') {
      setRawPassword(value);
    }
  };

  const signInSubmitHandler = () => {
    // Determine whether the entered input is an email or username
    const isEmail = userInput.includes('@');
    
    const user = {
      userInput: userInput,
      isEmail: isEmail,
      rawPassword: rawPassword,
    };

    axios.post("http://localhost:8080/users/signin", user)
      .then((response) => {
        localStorage.setItem("id", response.data.id);
        props.setUser(response.data);
        navigator("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className='signup-signin-content'>
      <div className='sign-up-box'>
        <div>Already A User?</div>
        <h1>Sign-In</h1>
        <div className='flex-row justify-content-left'>
          EMAIL/USERNAME
          <input
            className='input-container'
            value={userInput}
            name='userInput'
            type='text'
            onChange={signInChangeHandler}
          />
        </div>
        <div className='flex-row justify-content-left'>
          PASSWORD
          <input
            className='input-container'
            value={rawPassword}
            name='rawPassword'
            type='password'
            onChange={signInChangeHandler}
          />
        </div>
        <div className='flex-row justify-content-center'>
          <button onClick={signInSubmitHandler}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;