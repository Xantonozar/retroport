import React from 'react';
import Hero from './Hero';
import QuickLinks from './QuickLinks';
import Projects from './Projects';
import Blog from './Blog';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <QuickLinks />
      <Projects />
      <Blog />
    </>
  );
};

export default Home;