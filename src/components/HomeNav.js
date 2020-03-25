import React from "react";
import { NavLink, Route } from "react-router-dom";

const HomeNav = () => {
  //   const [home, setHome] = useState(true);
  //   const [social, setSocial] = useState(false);
  //   const [analytics, setAnalytics] = useState(false);

  //   const homeHandler = () => {
  //     setHome(true);
  //     setSocial(false);
  //     setAnalytics(false);
  //   };
  //   const socialHandler = () => {
  //     setHome(false);
  //     setSocial(true);
  //     setAnalytics(false);
  //   };
  //   const analyticsHandler = () => {
  //     setHome(false);
  //     setSocial(false);
  //     setAnalytics(true);
  //   };

  return (
    <div id="homeNavContainer">
      <ul className="homeNavUl">
        <NavLink
          className="homeLinkNav"
          to="/home/dashboard"
          //   onClick={homeHandler}
        >
          <li>Categories</li>
        </NavLink>
        <NavLink
          className={"homeLinkNav"}
          to="/home/que"
          //   onClick={socialHandler}
        >
          <li>Social Board</li>
        </NavLink>
        <NavLink
          className="homeLinkNav"
          to="/home/analytics"
          //   onClick={analyticsHandler}
        >
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