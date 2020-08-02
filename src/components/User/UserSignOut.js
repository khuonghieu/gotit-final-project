import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@gotitinc/design-system';
import { withRouter } from 'react-router';
import { signOut } from '../../actions/userAuth';
import { signOutModal } from '../../actions/changeModal';

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut),
  signOutModal: () => dispatch(signOutModal),
});

export function UserSignOut({ signOut, signOutModal, history }) {
  function onSignOut() {
    signOut();
    signOutModal();
    history.push('/');
  }
  return (
    <div>
      <Button variant="primary_outline" onClick={onSignOut}>
        <Button.Label>Sign Out</Button.Label>
      </Button>
    </div>
  );
}

export default withRouter(connect(null, mapDispatchToProps)(UserSignOut));
