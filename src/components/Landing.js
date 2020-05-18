import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../sass/landing.scss';

const Landing = () => {
  return (
    <div className="landing-body" style={{ height: '100vh', width: '100vw' }}>
      {/* ^ REMOVE INLINE ^ */}
      <div className="landing-navbar">
        <h3 data-cy="landing-logo" className="logo-text">
          SoMe
        </h3>
        <div className="landing-sign-nav">
          <NavLink
            data-cy="register-nav"
            to="/register"
            className="sign-up-btn"
          >
            Sign Up
          </NavLink>
          <NavLink data-cy="login-nav" className="sign-in-btn" to="/login">
            Sign In
          </NavLink>
        </div>
      </div>
      <div className="center-message">
        <div className="text-align-left">
          <h1 data-cy="main-text" className="main-text">
            A fresh take on social media management
          </h1>
          <h4 data-cy="secondary-text" className="secondary-text">
            Discover how to develop your brand and manage your digital marketing
            strategy
          </h4>
          <NavLink
            data-cy="call-to-action-button"
            className="start-here"
            to="/register"
          >
            Start here
          </NavLink>
        </div>
      </div>
      <footer className="sticky-footer">
        <div className="text-align">
          <p data-cy="copyright"> All rights reserved SoMe ®</p>
          <div className="footer-nav">
            <Link data-cy="team" className="team-link" to="/team">
              Team
            </Link>
            <a
              data-cy="github"
              href="https://github.com/Lambda-School-Labs/social-media-strategy-fe"
              className="team-link"
            >
              Github
            </a>
            <a
              data-cy="lambda-school"
              href="https://lambdaschool.com/"
              className="team-link"
            >
              Lambda School
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
