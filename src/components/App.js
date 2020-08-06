import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalContainer from './Modals';
import { getToken } from '../utilities/localStorage';
import fetchUserInfo from '../actions/fetchUserInfo';
import LandingPage from './LandingPage';
import Catalog from './Catalog';
import Profile from './Profile';

function mapStateToProps(state) {
  return {
    user: state.user,
    modal: state.modal,
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchUserInfo: () => dispatch(fetchUserInfo()),
});

export function App({
  user, modal, fetchUserInfo,
}) {
  React.useEffect(() => {
    if (user.loggedIn) {
      fetchUserInfo();
    }
  }, [fetchUserInfo, getToken(), user.loggedIn]);

  return (
    <div>
      <div><ModalContainer modal={modal} /></div>
      <Route
        exact
        path="/"
        component={LandingPage}
      />
      <Route
        path="/catalog"
        component={Catalog}
      />
      <Route path="/profile" component={Profile} />
    </div>

  );
}

App.propTypes = {
  user: PropTypes.object,
  modal: PropTypes.string,
  fetchUserInfo: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
