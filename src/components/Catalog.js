import React from 'react';
import { Header } from '@gotitinc/design-system';
import { Link } from 'react-router-dom';
import UserProfile from './User/UserProfile';
import UserSignOut from './User/UserSignOut';
import CategoriesTabList from './Categories/CategoriesTabList';

export function Catalog() {
  return (
    <div>
      <Header fullWidth>
        <Header.Main>
          <Header.Left>
            <Link to="/profile">
              <UserProfile />
            </Link>
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
