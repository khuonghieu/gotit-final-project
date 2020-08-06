import React, { useEffect } from 'react';
import { Header, Button } from '@gotitinc/design-system';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import UserProfile from './User/UserProfile';
import UserSignOut from './User/UserSignOut';
import CategoriesTabList from './Categories/CategoriesTabList';
import { chooseModal } from '../actions/modals';
import * as constants from '../constants/actions';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
const mapDispatchToProps = {
  chooseModal,
};

export function Catalog({ user, chooseModal }) {
  return (
    <div>
      <Header fullWidth>
        <Header.Main>
          <Header.Left>
            <UserProfile />
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
      <hr />
      <div><CategoriesTabList /></div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
