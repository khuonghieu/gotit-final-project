import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@gotitinc/design-system';
import PropTypes from 'prop-types';
import { chooseModal } from '../../actions/modals';
import * as constants from '../../constants/actions';

export function UserSignOut({ chooseModal }) {
  return (
    <div>
      <Button variant="primary_outline" onClick={() => chooseModal(constants.SIGN_OUT_MODAL)}>
        <Button.Label>Sign Out</Button.Label>
      </Button>
    </div>
  );
}

UserSignOut.propTypes = {
  // signOut: PropTypes.func.isRequired,
  chooseModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  chooseModal,
};

export default connect(null, mapDispatchToProps)(UserSignOut);
