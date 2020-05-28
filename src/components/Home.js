import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
// Components
import MediaManager from "./dashboard/MediaManager";
import Nav from "./Nav";
import DrawerMenu from "./DrawerMenu";

// Just to view what they will look like
import TopicNav from "./kanban/TopicNav";
import TopicBucket2 from "./kanban2/TopicBucket2";
import CreateTopic from "./kanban2/CreateTopic.js";

import HomePage from "./HomePage";


const Home = () => {
  const { authService, authState } = useOktaAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  // update user info in redux store
  // if user hasn't linked any social media account redirect to /link-accounts
  // else render dashboard (or another) component

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // if(hasn't linked any social media account) {
  //     return <Redirect to='/app/link-accounts'/>
  // }

  return (
    <>
      <Nav toggleMenu={toggleMenu} />
      <DrawerMenu open={menuOpen} toggleMenu={toggleMenu} />
      <HomePage/>

      {/* <TopicNav />
      <CreateTopic/>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          height: "100%",
          overflowY: "scroll",
          height: "calc(100vh - 127px)",
        }}
      >
        <TopicBucket2 />
      </div>


      <main>
        <Route exact path="/app/media-manager" component={MediaManager} />
      </main> */}
    </>
  );
};

export default React.memo(Home);
