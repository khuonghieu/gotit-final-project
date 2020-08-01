import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@gotitinc/design-system';
import { signOut } from '../../actions/userAuth';
import { signOutModal } from '../../actions/changeModal';

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut),
  signOutModal: () => dispatch(signOutModal),
});

export function UserSignOut({ signOut, signOutModal }) {
  function onSignOut() {
    signOut();
    signOutModal();
  }
  return (
    <div>
      <Button variant="primary_outline" onClick={onSignOut}>
        <Button.Label>Sign Out</Button.Label>
      </Button>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(UserSignOut);
