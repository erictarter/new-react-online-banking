import { Link } from 'react-router-dom';

import React from 'react';
import Nav from '../Nav';
import Showcase from '../Showcase';
import Footer from '../Footer';

const clear = () => {
  localStorage.clear();
};

// clear();

const Home = () => {
  return (
    <div>
      <Nav />
      <Showcase />
      <Footer />
    </div>
  );
};

export default Home;
