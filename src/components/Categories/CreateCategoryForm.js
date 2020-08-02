import { connect } from 'react-redux';
import { Form, Button } from '@gotitinc/design-system';
import React, { useState } from 'react';
import { createCategory } from '../../actions/categories';

const mapDispatchToProps = (dispatch) => ({
  createCategory: (name, description) => dispatch(createCategory(name, description)),
});

export function CreateCategoryForm({ createCategory }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function handleCreateCategory(e) {
    e.preventDefault();
    if (name && description) {
      const { success, payload } = await createCategory(name, description);
      if (!success) {
        console.log(payload);
      }
    } else {
      alert('Fill all the blanks');
    }
  }
  return (
    <div>
      <Form.Label>Category name</Form.Label>
      <Form.Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter category name" name="name" />
      <Form.Label>Category description</Form.Label>
      <Form.Input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter category description" name="description" />
      <Button onClick={handleCreateCategory}>Submit</Button>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(CreateCategoryForm);
