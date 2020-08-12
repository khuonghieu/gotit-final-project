import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@gotitinc/design-system';
import PropTypes from 'prop-types';
import { signOut } from '../../actions/users';
import { closeModal } from '../../actions/modals';

export function UserSignOut({ signOut, closeModal }) {
  function onSignOut() {
    signOut();
    closeModal();
  }
  return (
    <div>
      <Button variant="primary_outline" onClick={onSignOut}>
        <Button.Label>Sign Out</Button.Label>
      </Button>
    </div>
  );
}

UserSignOut.propTypes = {
  signOut: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signOut,
  closeModal,
};

export default connect(null, mapDispatchToProps)(UserSignOut);
