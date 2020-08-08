import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@gotitinc/design-system';
import PropTypes from 'prop-types';
import { signOut } from '../../actions/users';
import { chooseModal } from '../../actions/modals';
import * as constants from '../../constants/actions';

const mapDispatchToProps = {
  signOut,
  chooseModal,
};

export function UserSignOut({ signOut, chooseModal }) {
  function onSignOut() {
    signOut();
    chooseModal(constants.SIGN_OUT_MODAL);
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
  chooseModal: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(UserSignOut);
