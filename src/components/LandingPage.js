import React from 'react';
import { connect } from 'react-redux';
import { Header, Button } from '@gotitinc/design-system';
import UserProfile from './User/UserProfile';
import { signInModal, signUpModal } from '../actions/changeModal';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = (dispatch) => ({
  signUpModal: () => dispatch(signUpModal),
  signInModal: () => dispatch(signInModal),
});

export function LandingPage({ user, signUpModal, signInModal }) {
  return (
    <div>
      <Header fullWidth>
        <Header.Main>
          <Header.Left>
            <UserProfile user={user} />
          </Header.Left>
          <Header.Right>
            <Button onClick={signUpModal}>Sign up modal</Button>
            <Button onClick={signInModal}>Sign in modal</Button>
          </Header.Right>
        </Header.Main>
      </Header>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
