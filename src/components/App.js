import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Header, Button, ToastContainer, Logo,
} from '@gotitinc/design-system';
import ModalContainer from './Modals';
import { fetchUserInfo } from '../actions/users';
import Catalog from './Catalog';
import UserProfile from './User/UserProfile';
import UserSignOut from './User/UserSignOut';
import ItemDetails from './Items/ItemDetails';
import { chooseModal } from '../actions/modals';
import * as constants from '../constants/actions';

export function App({ user, fetchUserInfo, chooseModal }) {
  // Fetch user info on every render
  useEffect(() => {
    if (user.loggedIn) {
      fetchUserInfo();
    }
  }, [fetchUserInfo, user.loggedIn]);

  return (
    <div>
      <div><ModalContainer /></div>
      <ToastContainer />
      <Header fullWidth>
        <Header.Main>
          <Header.Left>
            <Link to="/">
              <Logo name="gotit" variant="original" />
            </Link>
            <UserProfile user={user} />
          </Header.Left>
          {user.loggedIn
            ? (
              <div>
                <Header.Right>
                  <div><UserSignOut /></div>
                </Header.Right>
              </div>
            ) : (
              <div>
                <Header.Right>
                  <Button onClick={() => chooseModal(constants.SIGN_UP_MODAL)}>Sign up</Button>
                  <Button onClick={() => chooseModal(constants.SIGN_IN_MODAL)}>Sign in</Button>
                </Header.Right>
              </div>
            )}
        </Header.Main>
      </Header>
      <Route
        exact
        path="/catalog/:categoryId?"
        component={Catalog}
      />
      <Route exact path="/catalog/:categoryId/:itemId" component={ItemDetails} />
      <Route exact path="/">
        <Redirect to="/catalog" />
      </Route>
    </div>

  );
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  fetchUserInfo: PropTypes.func.isRequired,
  chooseModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {
  fetchUserInfo,
  chooseModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
