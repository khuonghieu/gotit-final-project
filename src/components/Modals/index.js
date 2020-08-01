import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignInModal from './SignIn';
import SignUpModal from './SignUp';
import { closeModal } from '../../actions/changeModal';
import * as constants from '../../constants/actions';

function mapStateToProps(state) {
  return {
    modal: state.modal,
  };
}

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal),
});

const ModalMap = new Map();
ModalMap.set(constants.SIGN_IN_MODAL, SignInModal);
ModalMap.set(constants.SIGN_UP_MODAL, SignUpModal);

export function ModalContainer({ modal, closeModal }) {
  const ModalToRender = ModalMap.get(modal);
  return (
    <div>
      {modal ? <ModalToRender onClose={closeModal} /> : null}
    </div>
  );
}

ModalContainer.propTypes = {
  modal: PropTypes.string,
  closeModal: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
