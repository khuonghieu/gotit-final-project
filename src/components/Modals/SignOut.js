import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Modal } from '@gotitinc/design-system';
import { signOut } from '../../actions/users';

export function SignOutModal({ onClose, signOut }) {
  const [disable, setDisable] = useState(false);

  function handleSignOut(e) {
    e.preventDefault();
    setDisable(true);
    signOut();
    setDisable(false);
    onClose();
  }
  return (
    <div>
      <Modal size="small" show centered onHide={onClose}>
        <Modal.Header closeButton onClick={onClose}>
          <Modal.Title>Sign Out Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="u-textCenter">
            <img src="holder.js/100px90?text=Image" className="u-maxWidthFull u-marginBottomExtraSmall" alt="" />
          </div>
          Do you really want to sign out?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" width="full" disabled={disable} onClick={handleSignOut} id="sign-out-confirm-button">Yes</Button>
          <Button variant="secondary" width="full" onClick={onClose}>No</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

SignOutModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signOut,
};

export default connect(null, mapDispatchToProps)(SignOutModal);
