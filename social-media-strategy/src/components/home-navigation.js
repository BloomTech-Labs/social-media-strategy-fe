import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";

const HomeNav = () => {
  return (
    <div className="homeNavContainer">
      <ul>
        <NavLink to="/home/dashboard">
          <li>Categories</li>
        </NavLink>
        <NavLink to="/home/que">
          <li>Social Board</li>
        </NavLink>
        <NavLink to="/home/analytics">
          <li>Analytics</li>
        </NavLink>
      </ul>

      <Route path="/home/dashboard">Dashboard</Route>
      <Route path="/home/que">que</Route>
      <Route path="/home/analytics">analytics</Route>
    </div>
  );
};

export default HomeNav;
