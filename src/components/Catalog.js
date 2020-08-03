import React from 'react';
import { connect } from 'react-redux';
import { Header } from '@gotitinc/design-system';
import UserProfile from './User/UserProfile';
import UserSignOut from './User/UserSignOut';
import CategoriesTabList from './Categories/CategoriesTabList';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export function Catalog({ user }) {
  return (
    <div>
      <Header fullWidth>
        <Header.Main>
          <Header.Left>
            <UserProfile user={user} />
          </Header.Left>
          <Header.Right>
            <div><UserSignOut /></div>
          </Header.Right>
        </Header.Main>
      </Header>
      <hr />
      <div><CategoriesTabList /></div>
    </div>
  );
}

export default connect(mapStateToProps, null)(Catalog);
