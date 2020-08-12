import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, Form, Modal, Message, ToastContainer,
} from '@gotitinc/design-system';
import { signUp, signIn } from '../../actions/users';
import showPositiveToast from '../../util/toast';

export function SignUpModal({ onClose, signUp, signIn }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [disable, setDisable] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    if (email && username.length >= 5 && password.length >= 8 && name) {
      setDisable(true);
      const { success, payload } = await signUp(email, username, password, name);
      setDisable(false);
      if (!success) {
        setErrorMessage(payload.message);
      } else {
        showPositiveToast('Sign up success');
        onClose();
        signIn(username, password);
      }
    } else {
      setErrorMessage({ general: 'Fill all the blanks' });
    }
  }

  return (
    <div>
      <ToastContainer />
      <Modal show centered size="small" onHide={onClose}>
        <Modal.Header closeButton onClick={onClose}>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage ? (
            <Message type="system" variant="negative">
              <Message.Container>
                <Message.Title>
                  Sign up failed
                </Message.Title>
                <Message.Content>
                  {errorMessage.general}
                  {errorMessage.email}
                  {errorMessage.password}
                  {errorMessage.username}
                </Message.Content>
              </Message.Container>
            </Message>
          ) : null}
          <div className="u-textCenter">
            <img src="holder.js/100px90?text=Image" className="u-maxWidthFull u-marginBottomExtraSmall" alt="" />
          </div>
          <Form.Label>Email</Form.Label>
          <Form.Input value={email} onChange={(e) => { setErrorMessage(''); setEmail(e.target.value); }} type="email" placeholder="Enter email" name="email" />
          <Form.Label>Username</Form.Label>
          <Form.Input value={username} onChange={(e) => { setErrorMessage(''); setUsername(e.target.value); }} type="text" placeholder="Enter username" name="username" />
          <Form.Label>Password</Form.Label>
          <Form.Input value={password} onChange={(e) => { setErrorMessage(''); setPassword(e.target.value); }} type="password" placeholder="Enter password" name="password" />
          <Form.Label>Name</Form.Label>
          <Form.Input value={name} onChange={(e) => { setErrorMessage(''); setName(e.target.value); }} type="text" placeholder="Enter your name" name="name" />
          <Button disabled={disable} onClick={handleSignup}>Sign Up</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

SignUpModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signUp,
  signIn,
};

export default connect(null, mapDispatchToProps)(SignUpModal);
