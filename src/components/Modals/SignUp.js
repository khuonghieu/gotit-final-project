import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from '@gotitinc/design-system';
import { signUp } from '../../actions/userAuth';

const mapDispatchToProps = (dispatch) => ({
  signUp: (email, username, password, name) => dispatch(signUp(email, username, password, name)),
});

export function SignUpModal({ onClose, signUp }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function handleSignup(e) {
    e.preventDefault();
    if (email && username && password && name) {
      const { success, payload } = await signUp(email, username, password, name);
      if (!success) {
        console.log(payload);
      }
    } else {
      alert('fill all the blanks');
    }
  }

  return (
    <div>
      <Modal relative centered size="small">
        <Modal.Header closeButton onClick={onClose}>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Button onClick={handleSignup}>Submit</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

SignUpModal.propTypes = {
  onClose: PropTypes.func,
  signUp: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(SignUpModal);
