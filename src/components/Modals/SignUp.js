import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, Form, Modal, Message, toast, ToastContainer, Icon,
} from '@gotitinc/design-system';
import { signUp } from '../../actions/users';

const mapDispatchToProps = (dispatch) => ({
  signUp: (email, username, password, name) => dispatch(signUp(email, username, password, name)),
});

const notifyPositive = () => toast.success(() => (
  <div className="u-flex u-flexGrow-1">
    <div className="u-marginRightExtraSmall">
      <Icon name="checkmarkCircle" size="medium" />
    </div>
    <div className="u-flexGrow-1">
      <div className="u-fontMedium u-marginBottomExtraSmall">Sign up success</div>
    </div>
  </div>
), {
});

export function SignUpModal({ onClose, signUp }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [disable, setDisable] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();

    if (email && username && password && name) {
      setDisable(true);
      const { success, payload } = await signUp(email, username, password, name);
      setDisable(false);
      if (!success) {
        setErrorMessage(JSON.stringify(payload.message));
      } else {
        notifyPositive();
      }
    } else {
      setErrorMessage('Fill all the blanks');
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
                  {errorMessage}
                </Message.Content>
              </Message.Container>
            </Message>
          ) : null}
          <div className="u-textCenter">
            <img src="holder.js/100px90?text=Image" className="u-maxWidthFull u-marginBottomExtraSmall" alt="" />
          </div>
          <Form.Label>Email</Form.Label>
          <Form.Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" name="email" />
          <Form.Label>Username</Form.Label>
          <Form.Input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter username" name="username" />
          <Form.Label>Password</Form.Label>
          <Form.Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" name="password" />
          <Form.Label>Name</Form.Label>
          <Form.Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name" name="name" />
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

export default connect(null, mapDispatchToProps)(SignUpModal);
