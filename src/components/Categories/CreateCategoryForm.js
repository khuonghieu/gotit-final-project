import { useDispatch } from 'react-redux';
import { Form, Button } from '@gotitinc/design-system';
import React from 'react';
import { createCategory } from '../../actions/categories';

function CreateCategoryForm() {
  const dispatch = useDispatch();

  function handleCreateCategory(e) {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const description = e.target.elements.description.value;
    if (name && description) {
      dispatch(createCategory(name, description));
    } else {
      alert('Fill all the blanks');
    }
  }
  return (
    <div>
      <Form onSubmit={handleCreateCategory}>
        <Form.Label>Category name</Form.Label>
        <Form.Input type="text" placeholder="Enter category name" name="name" />
        <Form.Label>Category description</Form.Label>
        <Form.Input type="text" placeholder="Enter category description" name="description" />
        <Button>Submit</Button>
      </Form>
    </div>
  );
}

export default CreateCategoryForm;
