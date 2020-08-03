import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Modal } from '@gotitinc/design-system';
import { editItem } from '../../actions/items';

const mapDispatchToProps = (dispatch) => ({
  editItem: (categoryId, itemId, name, description, price) => dispatch(editItem(categoryId, itemId, name, description, price)),
});

export function EditItem({ onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  return (
    <Modal size="small" relative centered onHide={onClose}>
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="u-textCenter">
          <img src="holder.js/100px90?text=Image" className="u-maxWidthFull u-marginBottomExtraSmall" alt="" />
        </div>
        <Form.Label>Item name</Form.Label>
        <Form.Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter item name" name="name" />
        <Form.Label>Item description</Form.Label>
        <Form.Input value={description} onChange={(e) => setDescription(e.target.value)} type="Enter item description" placeholder="Enter password" name="description" />
        <Form.Label>Item price</Form.Label>
        <Form.Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Enter item price" name="price" />
        <Button id="edit-item-form-button">Confirm</Button>
      </Modal.Body>
    </Modal>
  );
}

export default connect(null, mapDispatchToProps)(EditItem);
