import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalContainer from './Modals';
import { fetchUserInfo } from '../actions/users';
import LandingPage from './LandingPage';
import Catalog from './Catalog';
import ItemDetails from './Items/ItemDetails';

function mapStateToProps(state) {
  return {
    user: state.user,
    modal: state.modal,
  };
}

const mapDispatchToProps = {
  fetchUserInfo,
};

export function App({ user, modal, fetchUserInfo }) {
  React.useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo, user.loggedIn]);

  return (
    <div>
      <div><ModalContainer modal={modal} /></div>
      <Route
        exact
        path="/"
        component={LandingPage}
      />
      <Route
        exact
        path="/catalog/:categoryId?"
        component={Catalog}
      />
      <Route exact path="/catalog/:categoryId/:itemId" component={ItemDetails} />
    </div>

  );
}

App.propTypes = {
  user: PropTypes.object,
  modal: PropTypes.string,
  fetchUserInfo: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
