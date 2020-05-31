import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

// Components
import Nav from "./Nav";
import DrawerMenu from "./DrawerMenu";

import MediaManager from "./dashboard/MediaManager.js";

const Home = () => {
  const { authService } = useOktaAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);
  console.log(user);

  // TODO: update user info in redux store
  // TODO: Using component state now. Change to react-redux useSelector
  // const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (!user.email) {
      axiosWithAuth().put(`users`);
    } else {
      // Check if user has linked twitter account
      if (!user.twitter_screenName) {
        // Redirect user if there is no linked accounts
        history.push("/connect/twitter");
      }
    }
  }, [authService, user]);

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
