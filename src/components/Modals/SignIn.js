import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, Form, Modal, Message,
} from '@gotitinc/design-system';
import { signIn } from '../../actions/users';

const mapDispatchToProps = {
  signIn,
};

export function SignInModal({ onClose, signIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  async function handleSignin(e) {
    e.preventDefault();
    console.log('username and pwd', username, password);
    if (username && password) {
      setDisable(true);
      const { success, payload } = await signIn(username, password);
      setDisable(false);
      if (!success) {
        setErrorMessage(payload.message);
      } else {
        onClose();
      }
    } else {
      // TODO: remove alerts
      setErrorMessage('Fill all the blanks');
    }
  }
  console.log('before return', username, password);
  return (
    <div>
      <Modal size="small" show centered onHide={onClose}>
        <Modal.Header closeButton onClick={onClose}>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage ? (
            <Message type="system" variant="negative">
              <Message.Container>
                <Message.Title>
                  Sign in failed
                </Message.Title>
                <Message.Content>
                  {errorMessage}
                </Message.Content>
              </Message.Container>
            </Message>
          ) : null}
          <div className="u-textCenter">
            <img src="holder.js/100px90?text=Image" className="u-maxWidthFull u-marginBottomExtraSmall" alt="" />
          </div>
          <Form.Label>Username</Form.Label>
          <Form.Input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter username" name="username" />
          <Form.Label>Password</Form.Label>
          <Form.Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" name="password" />
          <Button disabled={disable} onClick={handleSignin} id="sign-in-form-button">Sign In</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

SignInModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignInModal);
