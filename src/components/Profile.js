import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@gotitinc/design-system';
import CategoriesTabList from './Categories/CategoriesTabList';
import UserProfile from './User/UserProfile';
import UserSignOut from './User/UserSignOut';

export function Profile() {
  return (
    <div>
      <Header.Main>
        <Header.Left>
          <Link to="/catalog">
            <UserProfile />
          </Link>
        </Header.Left>
        <Header.Right>
          <div><UserSignOut /></div>
        </Header.Right>
      </Header.Main>
      <CategoriesTabList />
    </div>
  );
}

export default Profile;
