import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import DASHBOARD_ACCOUNT from './Dashboard_Account';
import DASHBOARD_FEED from './Dashboard_Feed';
import DASHBOARD_TWEETS from './Dashboard_Tweets.js';
import { currentUser, fetchAccounts } from '../../actions/index.js';

const Dashboard = (props) => {
  return (
    <div className='dash-app'>
      {props.user.drawerContent === 'HOME' ? (
        <>
          <DASHBOARD_ACCOUNT currentUser={props.user.currentUser} />
        </>
      ) : props.user.drawerContent === 'QUEUE' ? (
        <>
          <DASHBOARD_TWEETS
            currentUser={props.user.currentUser}
            user={props.user}
          />
        </>
      ) : (
        <DASHBOARD_FEED />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//     ...bindActionCreators({ currentUser, drawerswitch, drawerOpen }, dispatch),
//   };
// }

export default connect(mapStateToProps, { currentUser, fetchAccounts })(
  Dashboard
);
