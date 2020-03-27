import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../sass/Register_login.scss';

const Register_Login = () => {
  const [state, setstate] = useState({
    email: '',
    password: ''
  });
  const [signup, setsignup] = useState(false);
  const { push } = useHistory();

  const handlechange = e => {
    e.preventDefault();
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    Axios.post('https://post-route-feature.herokuapp.com/api/auth/login', state)
      .then(res => {
        console.log(res, `success`);
        localStorage.setItem('token', res.data.token);
        push(`/`);
      })
      .catch(err => console.log(err));
  };
  const handleSubmitSignup = e => {
    e.preventDefault();
    Axios.post(
      'https://post-route-feature.herokuapp.com/api/auth/register',
      state
    )
      .then(
        res =>
          alert('Sign up successful') &
          console.log(res) &
          window.location.reload(false)
      )
      .catch(err => console.log(err));
  };

  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column'
      }}>
      {!signup ? (
        <>
          <h1 style={{ width: '100%', textAlign: 'center' }}>
            Login <br />
            <span style={{ fontSize: '15px' }}>
              Need to sign up? click{' '}
              <span className='signup' onClick={() => setsignup(!signup)}>
                here
              </span>
            </span>
          </h1>
          <form onSubmit={handleSubmit}>
            <label>
              email {console.log(state)}
              <input
                name='email'
                value={state.email}
                type='text'
                onChange={handlechange}
              />
            </label>
            <label>
              Password:
              <input
                name='password'
                value={state.password}
                type='password'
                onChange={handlechange}
              />
            </label>

            <input type='submit' />
          </form>
        </>
      ) : (
        <>
          <h1 style={{ width: '100%', textAlign: 'center' }}>
            Signup <br />
            <span style={{ fontSize: '15px' }}>
              Already signed up? click&nbsp;
              <span className='signup' onClick={() => setsignup(!signup)}>
                here
              </span>
            </span>
          </h1>

          <form onSubmit={handleSubmitSignup}>
            <label>
              email {console.log(state)}
              <input
                name='email'
                value={state.email}
                type='text'
                onChange={handlechange}
              />
            </label>
            <label>
              Password:
              <input
                name='password'
                value={state.password}
                type='password'
                onChange={handlechange}
              />
            </label>

            <input type='submit' />
          </form>
        </>
      )}
    </div>
  );
};

export default Register_Login;
