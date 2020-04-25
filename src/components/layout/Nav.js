import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <div className='logo-container flex justify-center relative'>
        <div className='logo ml-12 md:ml-2 md:absolute md:left-0 top-0'></div>
      </div>
      <div className='nav-container text-gray-700 text-xl md:border-b flex flex-col justify-center items-center md:flex md:flex-row md:justify-end pt-5 md:mt-12 pb-0 px-4'>
        <div className='create'>
          <button className='nav-item md:mr-2 rounded-sm transition-colors duration-300 ease-out hover:text-gray-600 hover:bg-indigo-100'>
            <Link href='' className='px-2' to='/signup'>
              Create Account
            </Link>
          </button>
        </div>
        <div className='login'>
          <button className='nav-item md:mr-2 rounded-sm transition-colors duration-300 ease-out hover:text-gray-600 hover:bg-indigo-100'>
            <Link href='' className='px-2' to='/login'>
              Login
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
  );
};

export default Nav;
