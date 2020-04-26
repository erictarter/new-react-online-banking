import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';
import { link } from 'fs';

const Loginform = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [message, setMessage] = useState('');

  const { firstName, lastName, email, password, password2 } = useContext(
    Context
  );

  const storageEmail = localStorage.getItem('email');
  const storagePass = localStorage.getItem('password');

  const popupMessage = () => {
    const popup = document.getElementById('message-container');
    popup.classList.remove('hidden');
    popup.classList.remove('scale-0');
  };

  const removePopup = () => {
    const popup = document.getElementById('message-container');
    popup.classList.add('scale-0');
    setTimeout(() => {
      popup.classList.add('hidden');
    }, 220);
  };

  const onChange = e => {
    const linkToAccount = document.getElementById('link-to-account');
    const change = document.getElementById('change');
    const emailInput = document.getElementById('email');

    setPasswordInput(e.target.value);

    if (e.target.value === storagePass && emailInput.value === storageEmail) {
      change.innerHTML = `
      <div
          class='link-to-account flex items-center justify-center'
          id='link-to-account'
        >
        <a href='/account'>
        <button
        class='w-64 py-3 text-center mb-4 text-white bg-indigo-300 transition-colors duration-200 ease-out hover:bg-indigo-500 cursor-pointer border-none focus:outline-none'
        id='log-on-btn'
      >
        Log in
      </button>
      </a>
    </div>

        `;
    } else {
      linkToAccount.innerHTML = `
      <button class='w-64 py-3 text-center mb-4 text-white bg-indigo-300 transition-colors duration-200 ease-out hover:bg-indigo-500 cursor-pointer border-none focus:outline-none no-log-in'
      id='log-on-btn'
    }>
      Log in
    </button>
      `;
    }
  };

  const onClick = e => {
    e.preventDefault();
    if (storageEmail !== emailInput || storagePass !== passwordInput) {
      setMessage('Email or Password do not Match Our Records..');
      popupMessage();
    } else {
    }
  };

  return (
    <div className='form-container text-xl mt-10 px-4 pt-6 border border-indigo-200 rounded bg-indigo-100'>
      <div
        className='container-header text-center text-3xl'
        id='container-header'
      >
        Sign In
      </div>
      <div className='flex justify-center align-center'>
      <div
        className='message-container relative bg-white border border-red-400 rounded mb-5 hidden transform transition-transform duration-200 ease-out'
        id='message-container'
      >
        <div className='message text-red-400 text-center p-5' id='message'>
          {message}
        </div>
        {/* pop up dissapears when clicked */}
        <button className='exit-popup' id='exit-popup' onClick={removePopup}>
          <i className='fas fa-times'></i>
        </button>
      </div>
      </div>

      <label htmlFor='email'>Email</label>
      <div className='form-group'>
        <input
          type='email'
          id='email'
          placeholder='Enter Email'
          onChange={e => {
            setEmailInput(e.target.value);
          }}
        />
      </div>
      <label htmlFor='password'>Password </label>
      <div className='form-group'>
        <input
          type='password'
          id='password'
          placeholder='Enter Password'
          onChange={onChange}
        />
      </div>
      <div className='change' id='change'>
        <div
          className='link-to-account flex items-center justify-center'
          id='link-to-account'
          onClick={onClick}
        >
          <button
            className='w-64 py-3 text-center mb-4 text-white bg-indigo-300 transition-colors duration-200 ease-out hover:bg-indigo-500 cursor-pointer border-none focus:outline-none'
            id='log-on-btn'
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginform;
