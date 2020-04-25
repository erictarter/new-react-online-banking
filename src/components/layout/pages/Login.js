import { Link } from 'react-router-dom';

import React from 'react';
import Loginform from '../forms/Loginform';
import Footer from '../Footer';

const Login = () => {
  return (
    <div>
      <div>
        <div className='logo-container flex justify-center relative'>
          <div className='logo ml-12 md:ml-2 md:absolute md:left-0 top-0'></div>
        </div>
        <div className='nav-container text-gray-700 text-xl md:border-b flex flex-col justify-center items-center md:flex md:flex-row md:justify-end pt-5 md:mt-12 pb-0 px-4'>
          <div className='home'>
            <button className='nav-item md:mr-2 rounded-sm transition-colors duration-300 ease-out hover:text-gray-600 hover:bg-indigo-100'>
              <Link href='' className='px-2' to='/'>
                <i className='fas fa-arrow-circle-left'></i> Back Home
              </Link>
            </button>
          </div>
          <div className='about'>
            <button className='nav-item md:mr-2 rounded-sm transition-colors duration-300 ease-out hover:text-gray-600 hover:bg-indigo-100'>
              <a href='' className='px-2'>
                About
              </a>
            </button>
          </div>{' '}
          <div className='contact'>
            <button className='nav-item rounded-sm md:pr-2 nav-item transition-colors duration-300 ease-out hover:text-gray-600 hover:bg-indigo-100'>
              <a href='' className='px-2'>
                Contact
              </a>
            </button>
          </div>{' '}
        </div>
      </div>
      <div className='login-head'></div>
      <Loginform />
      <div className='footer-container mt-40'>
        <div className='footer mb-2'>
          <p>&copy;erictarter2020</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
