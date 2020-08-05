import React from 'react';
import { connect } from 'react-redux';
import { Header } from '@gotitinc/design-system';
import UserProfile from './User/UserProfile';
import UserSignOut from './User/UserSignOut';
import CategoriesTabList from './Categories/CategoriesTabList';

export function Catalog() {
  return (
    <div>
      <Header fullWidth>
        <Header.Main>
          <Header.Left>
            <UserProfile />
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

export default Catalog;
