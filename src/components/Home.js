import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
// Pages
import MediaManager from "./dashboard/MediaManager";
// Components
import Nav from "./Nav";
import DrawerMenu from "./DrawerMenu";

const Home = () => {
  const { authService } = useOktaAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // TODO: update user info in redux store
  // TODO: Using component state now. Change to react-redux useSelector
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (!user.email) {
      // load user info
      (async () => {
        const oktaUser = await authService.getUser();
        setUser(oktaUser);
        if (!user.twitter_screenName) {
          history.push("/connect/twitter");
        }
      })();
    }
  }, [authService, user]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    user && (
      <>
        <Nav toggleMenu={toggleMenu} />
        <DrawerMenu open={menuOpen} toggleMenu={toggleMenu} />

        <main>
          <Route exact path={["/app", "/app/media-manager"]}>
            <MediaManager user={user} />
          </Route>
        </main>
      </>
    )
  );
};

export default React.memo(Home);
