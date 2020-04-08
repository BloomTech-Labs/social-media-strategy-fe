import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { login, registerUser } from '../actions'
import "../sass/Register_login.scss";

const Register_Login = () => {
  const { register, handleSubmit } = useForm();
  const [signup, setsignup] = useState(false);

  const onSubmit = (data) => {
    if (!signup) {
      return login(data);
    } else {
      return registerUser(data);
    }
  };

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ width: "100%", textAlign: "center" }}>
        {!signup ? "Login" : "Sign Up"} <br />
        <span style={{ fontSize: "15px" }}>
          {!signup ? "Need to sign up?" : "Already signed up?"} click{" "}
          <span className='signup' onClick={() => setsignup(!signup)}>
            here
          </span>
        </span>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email:
          <input name='email' ref={register} />
        </label>
        <label>
          Password:
          <input name='password' ref={register} />
        </label>
        <input type='submit' />
      </form>
    </div>
  );
};

export default Register_Login;
