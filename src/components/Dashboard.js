import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DASHBOARD_ACCOUNT from './Dashboard_Account';
import DASHBOARD_FEED from './Dashboard_Feed';
import {
  drawerOpen,
  currentUser,
  drawerswitch,
  fetchAccounts,
} from '../actions';

const Dashboard = (props) => {
  return (
    <div className="dash-app">
      {props.user.drawerContent === 'HOME' ||
      props.user.drawerContent === 'ACCOUNT' ? (
        <>
          <DASHBOARD_ACCOUNT currentUser={props.user.currentUser} />
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
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ currentUser, drawerswitch, drawerOpen }, dispatch),
  };
}

export default connect(mapStateToProps, { currentUser, fetchAccounts })(
  Dashboard
);
