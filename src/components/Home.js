import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
// Pages
import MediaManager from "./dashboard/MediaManager";
import ConnectAccounts from "./auth/ConnectAccounts";
// Components
import Nav from "./Nav";
import DrawerMenu from "./DrawerMenu";

const Home = () => {
  const { authService } = useOktaAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // TODO: update user info in redux store
  // TODO: Using component state now. Change to react-redux useSelector
  const [user, setUser] = useState();

  useEffect(() => {
    if(!user) {
      // load user info
      (async () => {
        const oktaUser = await authService.getUser();
        setUser(oktaUser);
      })();
    }
  }, [authService, user]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (user && 
    <>
      <Nav toggleMenu={toggleMenu} />
      <DrawerMenu open={menuOpen} toggleMenu={toggleMenu} />

      <main>
        <Route exact path={['/app', '/app/media-manager']}>
          <MediaManager user={user} />
        </Route>
        <Route exact path='/app/connect'>
          <ConnectAccounts user={user} />
        </Route>
      </main>
    </>
  );
};

export default React.memo(Home);
