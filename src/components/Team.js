import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import '../sass/team.scss';
import jp from '../imgs/jp.jpg';
import jason from '../imgs/jason-long.jpg';
import matthew from '../imgs/matthew-bedard.jpg';
import jessica from '../imgs/jessica-wolff.jpg';
import jose from '../imgs/jose-rivera.png';
import tyler from '../imgs/tyler-gilchrist.jpg';
import andrew from '../imgs/andrew-lowe.jpg';
import sarah from '../imgs/sarah-xu.jpg';
import jud from '../imgs/jud-taylor.jpg';
import ana from '../imgs/ana-rosa-lerma.jpg';
import github from '../imgs/github.png';
import linkedin from '../imgs/linkedin.jpg';
import twitter from '../imgs/twitter-black.png';
import figma from '../imgs/figma-black.png';

const Team = () => {
  return (
    <div className='team-body' style={{ height: '100vh', width: '100vw' }}>
      {/* ^ REMOVE INLINE ^ */}
      <div className='landing-navbar'>
        <NavLink to='/landing' className='logo-text'>
          SoMe
        </NavLink>
        <div className='landing-sign-nav'>
          <NavLink to='/register' className='sign-up-btn'>
            Sign Up
          </NavLink>
          <NavLink className='sign-in-btn' to='/login'>
            Sign In
          </NavLink>
        </div>
      </div>
      <div className='centered'>
        <div className='center-team'>
          <div className='project-info'>
            <h2 style={{ marginBottom: '3rem' }}>SoMe Strategy</h2>
            <p>
              SoMe Strategy is a single page application created by a team of
              user-interface, web development, and data science students from
              Lambda School in the Labs22 unit. In the two month build, our team
              of engineers, designers and developers collaborated to create the
              user-friendly interface for small business social media managers.
            </p>
            <p>
              {' '}
              Our goal objectives were to: reduce the time to draft and organize
              social posts, improve post engagement by providing an optimal-time
              feature based on their followers' engagement history, allow for
              accessibility across multiple device sizes, and help reduce the
              number of tools the social media manager has to use by providing
              cross-platform analytics.{' '}
            </p>
            <h5>Mission</h5>
            <p>
              Connecting businesses - both large and small - with their optimal
              consumer base, by helping them cultivate content that acquires and
              retains long-term interest.{' '}
            </p>
            <h5>Vision</h5>
            <p>
              Our focus is on helping our users foster customer relationships,
              and build their brand and businesses through strategic social
              media management.{' '}
            </p>
            <div className='links'>
              <a href='https://github.com/Lambda-School-Labs/social-media-strategy-fe'>
                <img alt='' className='social-link' src={github} />
              </a>
              <a href='https://www.figma.com/file/ssdhBZL2Yr9GYaRyZtO8Cu/Social-Media-Strategy%2C-JP?node-id=179%3A0'>
                <img alt='' className='social-link' src={figma} />
              </a>
              <a href='https://twitter.com/some_strategy'>
                <img alt='' className='social-link' src={twitter} />
              </a>
            </div>
          </div>
          <div className='team-table'>
            <div className='title-div'>
              <p className='team-title'>Team Lead</p>
            </div>
            <div className='contributor'>
              <h4>Ana Rosa Lerma</h4>
              <img alt='' className='headshot' src={ana} alt='' />
              <div className='links'>
                <a href='https://www.linkedin.com/in/ana-rosa-lerma/'>
                  <img alt='' className='social-link' src={linkedin} />
                </a>
                <a href='https://twitter.com/anarosaUX'>
                  <img alt='' className='social-link' src={twitter} />
                </a>
              </div>
            </div>
          </div>
          <div className='team-table'>
            <div className='title-div'>
              <p className='team-title'>UX</p>
            </div>
            <div className='contributor'>
              <h4>JP Eliares</h4>
              <img alt='' className='headshot' src={jp} />
              <div className='links'>
                <a href='https://www.linkedin.com/in/jpeliares/'>
                  <img alt='' className='social-link' src={linkedin} />
                </a>
              </div>
            </div>
          </div>
          <div className='team-table'>
            <div className='title-div'>
              <p className='team-title'>Web Devs</p>
            </div>
            <div className='contributor'>
              <h4>Jason Long</h4>
              <img alt='' className='headshot' src={jason} />
              <div className='links'>
                <a href='https://github.com/jlong5795'>
                  <img alt='' className='social-link' src={github} />
                </a>
                <a href='https://www.linkedin.com/in/jasonlong1231/'>
                  <img alt='' className='social-link' src={linkedin} />
                </a>
                <a href='https://twitter.com/Jrive204'>
                  <img alt='' className='social-link' src={twitter} />
                  <img alt='' className='social-link' src={github} />
                </a>
                <a href='https://www.linkedin.com/in/jasonlong1231/'>
                  <img alt='' className='social-link' src={linkedin} />
                </a>
                <a href='https://twitter.com/Jrive204'>
                  <img alt='' className='social-link' src={twitter} />
                </a>
              </div>
            </div>
            <div className='contributor'>
              <h4>Matthew Bedard</h4>
              <img alt='' className='headshot' src={matthew} />
              <div className='links'>
                <a href='https://github.com/Matt-GitHub'>
                  <img alt='' className='social-link' src={github} />
                </a>
                <a href='https://www.linkedin.com/in/matthew-bedard-dev/'>
                  <img alt='' className='social-link' src={linkedin} />
                </a>
              </div>
            </div>
            <div className='contributor'>
              <h4>Tyler Gilchrist</h4>
              <img alt='' className='headshot' src={tyler} />
              <div className='links'>
                <a href='https://github.com/Tyler668'>
                  <img alt='' className='social-link' src={github} />
                </a>
                <a href='https://www.linkedin.com/in/tyler-gilchrist-a5a426191/'>
                  <img alt='' className='social-link' src={linkedin} />
                </a>
              </div>
            </div>
            <div className='contributor'>
              <h4>Jose Rivera</h4>
              <img alt='' className='headshot' src={jose} />
              <div className='links'>
                <a href='https://github.com/Jrive204'>
                  <img alt='' className='social-link' src={github} />
                </a>
                <a href='https://twitter.com/Jrive204'>
                  <img alt='' className='social-link' src={twitter} />
                </a>
              </div>
            </div>
            <div className='contributor'>
              <h4>Jessica Wolff</h4>
              <img alt='' className='headshot' src={jessica} />
              <div className='links'>
                <a href='https://github.com/jleahwolff'>
                  <img alt='' className='social-link' src={github} />
                </a>
                <a href='https://www.linkedin.com/in/jwolff2/'>
                  <img alt='' className='social-link' src={linkedin} />
                </a>
                <a href='https://twitter.com/jleahwolff'>
                  <img alt='' className='social-link' src={twitter} />
                </a>
              </div>
            </div>
          </div>

          <div className='team-table'>
            <div className='title-div'>
              <p className='team-title'>Data Science</p>
            </div>
            <div className='contributor'>
              <h4>Andrew Lowe</h4>
              <img alt='' className='headshot' src={andrew} />
              <div className='links'>
                <a href='https://github.com/AndrewSLowe'>
                  <img alt='' className='social-link' src={github} />
                </a>
                <a href='https://www.linkedin.com/in/andrew-lowe-5b581714a/'>
                  <img alt='' className='social-link' src={linkedin} />
                </a>
                <a href='https://twitter.com/andrewloweGR'>
                  <img alt='' className='social-link' src={twitter} />
                </a>
              </div>
            </div>
            <div className='contributor'>
              <h4>Sarah Xu</h4>
              <img alt='' className='headshot' src={sarah} />
              <div className='links'>
                <a href='https://github.com/sarahxu087'>
                  <img alt='' className='social-link' src={github} />
                </a>
              </div>
            </div>
            <div className='contributor'>
              <h4>Jud Taylor</h4>
              <img alt='' className='headshot' src={jud} />
              <div className='links'>
                <a href='https://github.com/gptix'>
                  <img alt='' className='social-link' src={github} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className='sticky-footer'>
        <div className='text-align'>
          <p> All rights reserved SoMe ®</p>
          <div className='footer-nav'>
            <NavLink className='team-link' to='/team'>
              Contact us
            </NavLink>
            <a
              href='https://github.com/Lambda-School-Labs/social-media-strategy-fe'
              className='team-link'
            >
              Github
            </a>
            <a href='https://lambdaschool.com/' className='team-link'>
              Lambda School
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Team;
