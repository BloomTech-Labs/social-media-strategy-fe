import React from 'react';
import { NavLink } from 'react-router-dom';
import '../sass/landing.scss';

const Landing = () => {
  return (
    <div className='landing-body' style={{ height: '100vh', width: '100vw' }}>
      {/* ^ REMOVE INLINE ^ */}
      <div className='landing-navbar'>
        <h3 className='logo-text'>SoMe</h3>
        <div className='landing-sign-nav'>
          <NavLink to='/' className='sign-up-btn'>
            Sign Up
          </NavLink>
          <NavLink className='sign-in-btn' to='/'>
            Sign In
          </NavLink>
        </div>
      </div>
      <div className='center-message'>
        <div className='text-align-left'>
          <h1 className='main-text'>A fresh take on social media management</h1>
          <h4 className='secondary-text'>
            Discover how to develop your brand and manage your digital marketing
            strategy
          </h4>
          <NavLink className='start-here' to='/'>
            Start here
          </NavLink>
        </div>
      </div>
      <footer className='sticky-footer'>
        <div className='text-align'>
          <p> All rights reserved SoMe ®</p>
          <div className='footer-nav'>
            <NavLink className='team-link' to='/team'>
              Team
            </NavLink>
            <NavLink className='team-link' to='/about-us'>
              Github
            </NavLink>
            <NavLink className='team-link' to='/about-us'>
              Lambda
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
