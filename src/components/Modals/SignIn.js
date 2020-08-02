import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from '@gotitinc/design-system';
import { withRouter } from 'react-router';
import { signIn } from '../../actions/userAuth';

const mapDispatchToProps = (dispatch) => ({
  signIn: (username, password) => dispatch(signIn(username, password)),
});

export function SignInModal({ onClose, signIn, history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignin(e) {
    e.preventDefault();
    if (username && password) {
      const { success, payload } = await signIn(username, password);
      if (!success) {
        console.log(payload);
      } else {
        history.push('/catalog');
      }
    } else {
      alert('Fill all the blanks');
    }
  }
  return (
    <Modal size="small" relative centered onHide={onClose}>
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="u-textCenter">
          <img src="holder.js/100px90?text=Image" className="u-maxWidthFull u-marginBottomExtraSmall" alt="" />
        </div>
        <Form.Label>Username</Form.Label>
        <Form.Input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter username" name="username" />
        <Form.Label>Password</Form.Label>
        <Form.Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" name="password" />
        <Button onClick={handleSignin} id="sign-in-form-button">Submit</Button>
      </Modal.Body>
    </Modal>
  );
}

SignInModal.propTypes = {
  onClose: PropTypes.func,
  signIn: PropTypes.func,
  history: PropTypes.object,
};

export default withRouter(connect(null, mapDispatchToProps)(SignInModal));
