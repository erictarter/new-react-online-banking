import React from 'react';
import { Link } from 'react-router-dom';

const Showcase = () => {
  return (
    <div>
      <div className='showcase-container mt-5 md:mt-40 flex flex-col justify-center items-center'>
        <h2 className='login-lead text-3xl text-center'>
          Sign in to Use Online Services
        </h2>
        <button className='log-in-btn mb-5 w-64 text-xl mt-4 px-6 py-3 bg-indigo-300 transition-colors duration-300 ease-out hover:bg-indigo-500 text-white focus:outline-none'>
          <Link to='/login'>Sign in</Link>
        </button>
        <h2 className='login-lead text-3xl text-center mt-10'>
          Haven't Made an Account yet?
        </h2>
        <button className='log-in-btn text-xl w-64 mt-4 px-6 py-3 bg-indigo-300 transition-colors duration-300 ease-out hover:bg-indigo-500 text-white focus:outline-none'>
          <Link to='/signup'>Create Account</Link>
        </button>
      </div>
    </div>
  );
};

export default Showcase;
