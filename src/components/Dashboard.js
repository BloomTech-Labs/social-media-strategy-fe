import React from "react";
import { Link } from 'react-router-dom';
// import AddAccount from "./AddAccount";
import data from "./accounts.json";
import img from "../assets/headshot.jpg";
import "../sass/dashboard.scss";
import pin from "../assets/pin.svg";
const accountData = data.accounts;
const Dashboard = () => {
  return (
      <div className="dash-app">
      <div className="title">
      <h1 className="bold">Dashboard</h1>
      <div className="dash-title">
      <h4 className="highlight">Tuesday</h4> <h4 className="highlight"> ▪ </h4><h4> 16 March, 2020</h4>
      </div>
      <div className="acct-title">
      <h2 className="blue-bold">Accounts</h2>
      <Link className="button" to={{
        pathname:'/add-acct',
        state: {modal: true },
        }}>Add Account</Link>
      </div>
        {accountData.map(e => (
      <div key={data.id} className="acct-card">
        <img className='icon' src={img} alt='Profile'/>
        <h3>{e.firstName}{e.lastName}</h3>
        <h5>{e.twitterHandle}</h5>
        <div className="location">
          <img 
            className="location-img"
            src={pin}/>
          <h4>{e.location}</h4>
        </div>
                <div className="all-stats">
                <div className="headers">
                    <h5>Posts</h5>
                    <h6>{e.posts}</h6>
                </div>
                <div className="headers">
                    <h5>Following</h5>
                    <h6>{e.following}</h6>
                </div>
                <div className="headers">
                    <h5>Followers</h5>
                    <h6>{e.followers}</h6>
                </div>
                </div>
          </div>
          ))}
        </div>
      </div>
  );
}
export default Dashboard;