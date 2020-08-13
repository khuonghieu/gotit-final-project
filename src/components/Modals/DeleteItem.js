import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Modal } from '@gotitinc/design-system';
import { deleteItem } from '../../actions/items';

export function DeleteItemModal({
  onClose, deleteItem, prefill, callbackFunc,
}) {
  const [disable, setDisable] = useState(false);

  async function handleDeleteItem(e) {
    e.preventDefault();
    setDisable(true);
    await deleteItem(prefill.categoryId, prefill.itemId);
    setDisable(false);
    callbackFunc();
    onClose();
  }
  return (
    <div>
      <Modal size="small" show centered onHide={onClose}>
        <Modal.Header closeButton onClick={onClose}>
          <Modal.Title>Delete Item Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="u-textCenter">
            <img src="holder.js/100px90?text=Image" className="u-maxWidthFull u-marginBottomExtraSmall" alt="" />
          </div>
          Do you really want to delete this item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" width="full" disabled={disable} onClick={handleDeleteItem} id="sign-out-confirm-button">Yes</Button>
          <Button variant="secondary" width="full" onClick={onClose}>No</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

DeleteItemModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  deleteItem,
};

export default connect(null, mapDispatchToProps)(DeleteItemModal);
