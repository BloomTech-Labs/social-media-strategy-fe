import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";

import { initializeUser } from "../actions/userActions";

// Components
import Nav from "./Nav";
import DrawerMenu from "./DrawerMenu";

import MediaManager from "./dashboard/MediaManager.js";

const Home = () => {
  const { authService } = useOktaAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log("Home.js useEffect fired", Date.now());
    if (!user.initialized) {
      dispatch(initializeUser(authService));
    } else if (!user.twitter_handle) {
      history.push("/connect/twitter");
    }
  }, [user]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Nav toggleMenu={toggleMenu} />
      <DrawerMenu open={menuOpen} toggleMenu={toggleMenu} />

      <main>
        {/* <Route exact path={["/home", "/home/media-manager"]}>
          <MediaManager />
        </Route> */}
      </main>
    </>
  );
};

export default React.memo(Home);
