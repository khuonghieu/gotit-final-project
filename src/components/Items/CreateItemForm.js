import { connect } from 'react-redux';
import { Form, Button } from '@gotitinc/design-system';
import React, { useState } from 'react';
import { createItem } from '../../actions/items';

function mapStateToProps(state) {
  return {
    currentCategory: state.categories.currentCategory,
  };
}

const mapDispatchToProps = (dispatch) => ({
  createItem: (categoryId, name, description, price) => dispatch(createItem(categoryId, name, description, price)),
});

export function CreateItemForm({ currentCategory, createItem }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.0);

  async function handleCreateItem(e) {
    e.preventDefault();
    if (currentCategory && name && description && price) {
      const { success, payload } = await createItem(currentCategory, name, description, price);
      if (!success) {
        console.log(payload);
      }
    } else {
      alert('Fill all the blanks');
    }
  }
  return (
    <div>
      <Form.Label>Item name</Form.Label>
      <Form.Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter item name" name="name" />
      <Form.Label>Item description</Form.Label>
      <Form.Input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter item description" name="description" />
      <Form.Label>Item price</Form.Label>
      <Form.Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Enter item price" name="price" />
      <Button onClick={handleCreateItem}>Submit</Button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateItemForm);
