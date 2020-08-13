import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignInModal from './SignIn';
import SignUpModal from './SignUp';
import DeleteItemModal from './DeleteItem';
import SignOutModal from './SignOut';
import { closeModal } from '../../actions/modals';
import * as constants from '../../constants/actions';
import EditItem from './EditItem';

const ModalMap = new Map();
ModalMap.set(constants.SIGN_IN_MODAL, SignInModal);
ModalMap.set(constants.SIGN_UP_MODAL, SignUpModal);
ModalMap.set(constants.EDIT_ITEM_MODAL, EditItem);
ModalMap.set(constants.DELETE_ITEM_MODAL, DeleteItemModal);
ModalMap.set(constants.SIGN_OUT_MODAL, SignOutModal);

export function ModalContainer({ modal, closeModal }) {
  const ModalToRender = ModalMap.get(modal.modalChosen);
  return (
    <div>
      {modal.modalChosen ? (
        <ModalToRender
          onClose={closeModal}
          prefill={modal.prefill}
          callbackFunc={modal.callbackFunc}
        />
      )
        : null}
    </div>
  );
}

ModalContainer.propTypes = {
  modal: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    modal: state.modal,
  };
}

const mapDispatchToProps = {
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
