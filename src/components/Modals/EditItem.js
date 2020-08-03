import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Modal } from '@gotitinc/design-system';
import { editItem } from '../../actions/items';

function mapStateToProps(state) {
  return {
    item: state.item,
    categoryId: state.categories.currentCategory,
  };
}

const mapDispatchToProps = (dispatch) => ({
  editItem: (categoryId, itemId, name, description, price) => dispatch(editItem(categoryId, itemId, name, description, price)),
});

export function EditItem({
  onClose, item, editItem, categoryId,
}) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);

  async function handleEditItem(e) {
    e.preventDefault();
    if (name && description && price) {
      const { success, payload } = await editItem(categoryId, item.id, name, description, price);
      if (!success) {
        console.log(payload);
      }
    } else {
      alert('fill all the blanks');
    }
  }

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
        <Form.Input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter description" name="description" />
        <Form.Label>Item price</Form.Label>
        <Form.Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Enter item price" name="price" />
        <Button onClick={handleEditItem} id="edit-item-form-button">Confirm</Button>
      </Modal.Body>
    </Modal>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
