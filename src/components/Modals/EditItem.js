import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, Form, Modal, Message,
} from '@gotitinc/design-system';
import PropTypes from 'prop-types';
import { editItem } from '../../actions/items';

function mapStateToProps(state) {
  return {
    item: state.item,
    categoryId: state.categories.currentCategory,
  };
}

const mapDispatchToProps = {
  editItem,
};

export function EditItem({
  onClose, item, editItem, categoryId,
}) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);

  const [errorMessage, setErrorMessage] = useState('');

  async function handleEditItem(e) {
    e.preventDefault();
    if (name && description && price) {
      const { success, payload } = await editItem(categoryId, item.id, name, description, price);
      if (!success) {
        setErrorMessage(JSON.stringify(payload));
      } else {
        setErrorMessage('');
        onClose();
      }
    } else {
      setErrorMessage('Fill all the blanks before submit');
    }
  }

  return (
    <div>
      {errorMessage ? (
        <Message type="system" variant="negative">
          <Message.Container>
            <Message.Title>
              Edit item failed
            </Message.Title>
            <Message.Content>
              {errorMessage}
            </Message.Content>
          </Message.Container>
        </Message>
      ) : null}
      <Modal size="small" show centered onHide={onClose}>
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
    </div>
  );
}

EditItem.propTypes = {
  onClose: PropTypes.func,
  item: PropTypes.object,
  editItem: PropTypes.func,
  categoryId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
