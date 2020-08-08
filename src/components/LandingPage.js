import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Header, Button } from '@gotitinc/design-system';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import UserProfile from './User/UserProfile';
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

export function LandingPage({ user, chooseModal }) {
  const history = useHistory();
  useEffect(() => {
    history.push('/catalog');
  }, [history]);
  return (
    <div>
      <Header fullWidth>
        <Header.Main>
          <Header.Left>
            <UserProfile user={user} />
          </Header.Left>
          <Header.Right>
            <Button onClick={() => chooseModal(constants.SIGN_UP_MODAL)}>Sign up modal</Button>
            <Button onClick={() => chooseModal(constants.SIGN_IN_MODAL)}>Sign in modal</Button>
          </Header.Right>
        </Header.Main>
      </Header>
    </div>
  );
}

LandingPage.propTypes = {
  user: PropTypes.object.isRequired,
  chooseModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
