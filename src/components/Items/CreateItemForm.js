import { connect } from 'react-redux';
import { Form, Button, Message } from '@gotitinc/design-system';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createItem } from '../../actions/items';

function mapStateToProps(state) {
  return {
    currentCategory: state.categories.currentCategory,
  };
}

const mapDispatchToProps = (dispatch) => ({
  createItem: (categoryId, name, description, price) => dispatch(createItem(categoryId, name, description, price)),
});

export function CreateItemForm({ currentCategory, createItem, refreshItemList }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.0);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setName('');
    setDescription('');
    setPrice(0);
  }, [currentCategory]);

  async function handleCreateItem(e) {
    e.preventDefault();
    if (currentCategory && name && description && price) {
      const { success, payload } = await createItem(currentCategory, name, description, price);
      refreshItemList();
      if (!success) {
        setErrorMessage(JSON.stringify(payload));
      } else {
        setErrorMessage('');
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
              Sign in failed
            </Message.Title>
            <Message.Content>
              {errorMessage}
            </Message.Content>
          </Message.Container>
        </Message>
      ) : null}
      <p>
        <b>Create item for this category:</b>
      </p>
      <Form.Label>Item name</Form.Label>
      <Form.Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter item name" name="name" />
      <Form.Label>Item description</Form.Label>
      <Form.Input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter item description" name="description" />
      <Form.Label>Item price</Form.Label>
      <Form.Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Enter item price" name="price" />
      <Button onClick={handleCreateItem}>Create Item</Button>
    </div>
  );
}

CreateItemForm.propTypes = {
  currentCategory: PropTypes.number,
  createItem: PropTypes.func,
  refreshItemList: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateItemForm);
