import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';

const Signupform = () => {
  // message state for popup

  const [message, setMessage] = useState('');
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmai] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passMatch, setPassMatch] = useState(false);

  // global state

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    password2,
    setPassword2,
    savings,
    checking,
    total,
    savingsAccountNumber,
    setSavingsAccountNumber,
    checkingAccountNumber,
    setCheckingAccountNumber
  } = useContext(Context);

  // popup message if form isnt filled out correctly

  const popupMessage = () => {
    const popup = document.getElementById('message-container');
    popup.classList.remove('hidden');
    popup.classList.remove('scale-0');
  };

  // popup is removed

  const removePopup = () => {
    const popup = document.getElementById('message-container');
    popup.classList.add('scale-0');
    setTimeout(() => {
      popup.classList.add('hidden');
    }, 220);
  };

  // on submit checks if form is filled out correctly

  const onSubmit = e => {
    e.preventDefault();
    const passMatch = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    // if (password.match(passMatch)) {
    // }
    // {
    //   setMessage(
    //     'Password must be between 6-20 characters, contain an uppercase character, and a numerical digit '
    //   );
    //   setPassMatch(true);
    // }

    if (password.length > 5 && password.length < 21) {
      setPassLength(true);
    } else {
      setMessage('Password Must Be Between 6-20 characters');
      popupMessage();
    }
    if (password2 === password) {
      setPassMatch(true);
    } else {
      setMessage('Passwords do not Match...');
      popupMessage();
    }
    if (passLength && passMatch) {
      setValidPass(true);
    }
    if (!email.includes('@')) {
      setMessage('Invalid Email...');
      popupMessage();
    } else {
      setValidEmai(true);
    }
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      password2 === ''
    ) {
      setMessage('Required Form Field Missing');
      popupMessage();
    } else {
      setValidName(true);
    }
    if (validName && validEmail && validPass) {
      accountCreated();
    }
  };

  // function is called when form is filled out correctly and submitted

  const accountCreated = () => {
    const validation = document.getElementById('account-created');
    const form = document.getElementById('form');
    const header = document.getElementById('container-header');
    const formContainer = document.getElementById('form-container');
    formContainer.classList.add('mb-64');
    header.classList.add('hidden');
    validation.classList.remove('hidden');
    form.classList.add('hidden');
    localStorage.setItem('firstName', `${firstName}`);
    localStorage.setItem('lastName', `${lastName}`);
    localStorage.setItem('email', `${email}`);
    localStorage.setItem('password', `${password}`);
    localStorage.setItem('savings', `${savings}`);
    localStorage.setItem('checking', `${checking}`);
    localStorage.setItem('total', `${total}`);
    localStorage.setItem('savingsAccountNumber', `${savingsAccountNumber}`);
    localStorage.setItem('checkingAccountNumber', `${checkingAccountNumber}`);
  };

  return (
    <div>
      {/* form container */}
      <div
        className='form-container text-xl bg-indigo-100 mt-10 pt-6 px-4 border border-indigo-200'
        id='form-container'
      >
        {/* container head text */}
        <div
          className='container-header text-center text-3xl'
          id='container-header'
        >
          Create Account
        </div>
        {/* displayed after form is accepted */}
        <div
          className='account-created text-center text-3xl hidden'
          id='account-created'
        >
          Account Successfuly Created! <br />
          Sign in to Access Acount <br />{' '}
          <Link to='/login'>
            <button className='border border-indigo-500 bg-indigo-400 text-white rounded px-5 py-2 mt-4 mb-4 transition-colors duration-200 ease-out hover:bg-indigo-300 hover:border-indigo-300 hover:text-white'>
              Sign In
            </button>
          </Link>
        </div>
        {/* popup message */}
        <div className='flex justify-center align-center'>
          <div
            className='message-container relative bg-white border border-red-400 rounded mb-5 hidden transform transition-transform duration-200 ease-out'
            id='message-container'
          >
            <div className='message text-red-400 text-center p-5' id='message'>
              {message}
            </div>
            {/* pop up dissapears when clicked */}
            <button
              className='exit-popup'
              id='exit-popup'
              onClick={removePopup}
            >
              <i className='fas fa-times'></i>
            </button>
          </div>
        </div>
        {/* form */}
        <form action='' className='form' onSubmit={onSubmit} id='form'>
          <label htmlFor='first'>First Name</label>
          <div className='form-group'>
            <input
              className='focus:outline-none'
              type='text'
              id='first'
              placeholder='Enter First Name'
              onChange={e => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <label htmlFor='last'>Last Name</label>
          <div className='form-group'>
            <input
              className='focus:outline-none'
              type='text'
              id='last'
              placeholder='Enter Last Name'
              onChange={e => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <label htmlFor='email'>Email</label>
          <div className='form-group'>
            <input
              className='focus:outline-none'
              type='text'
              id='email'
              placeholder='Enter Email'
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <label htmlFor='password'>
            Password{' '}
            <span>
              <small>(must be 6-20 characters)</small>
            </span>
          </label>
          <div className='form-group'>
            <input
              className='focus:outline-none'
              type='password'
              id='password'
              placeholder='Enter Password'
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <label htmlFor='password2'>Confirm Password</label>
          <div className='form-group'>
            <input
              className='focus:outline-none'
              type='password'
              id='password2'
              placeholder='Confirm Password'
              onChange={e => {
                setPassword2(e.target.value);
              }}
            />
          </div>
          <input
            type='submit'
            name='Finish'
            id='finish'
            value='Finish'
            className='py-3 text-white bg-indigo-300 transition-colors duration-200 ease-out hover:bg-indigo-500 cursor-pointer border-none focus:outline-none'
          />
        </form>
      </div>
    </div>
  );
};

export default Signupform;
