import { connect } from 'react-redux';
import {
  Form, Button, Message, toast, Icon, ToastContainer,
} from '@gotitinc/design-system';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createItem } from '../../actions/items';

function mapStateToProps(state) {
  return {
    currentCategory: state.categories.currentCategory,
    user: state.user,
  };
}

const mapDispatchToProps = {
  createItem,
};

const notifyPositive = () => toast.success(() => (
  <div className="u-flex u-flexGrow-1">
    <div className="u-marginRightExtraSmall">
      <Icon name="checkmarkCircle" size="medium" />
    </div>
    <div className="u-flexGrow-1">
      <div className="u-fontMedium u-marginBottomExtraSmall">Create item success</div>
    </div>
  </div>
), {
});

export function CreateItemForm({
  currentCategory, createItem, refreshItemList, user,
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.0);

  const [errorMessage, setErrorMessage] = useState('');

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setName('');
    setDescription('');
    setPrice(0);
  }, [currentCategory]);

  async function handleCreateItem(e) {
    e.preventDefault();
    if (currentCategory && name && description && price) {
      // Disable button during API call
      setDisable(true);

      const { success, payload } = await createItem(currentCategory, name, description, price);
      setDisable(false);
      refreshItemList();
      if (!success) {
        setErrorMessage(JSON.stringify(payload));
      } else {
        // Clear form input when item created successfully
        notifyPositive();
        setErrorMessage('');
        setName('');
        setDescription('');
        setPrice(0);
      }
    } else {
      setErrorMessage('Fill all the blanks before submission');
    }
  }
  return (
    // Only show form if logged in
    user.loggedIn ? (
      <div>
        {errorMessage ? (
          <Message type="system" variant="negative">
            <Message.Container>
              <Message.Title>
                Create item fail failed
              </Message.Title>
              <Message.Content>
                {errorMessage}
              </Message.Content>
            </Message.Container>
          </Message>
        ) : null}
        <ToastContainer />
        <p>
          <b>Create item for this category:</b>
        </p>
        <Form.Label>Item name</Form.Label>
        <Form.Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter item name" name="name" />
        <Form.Label>Item description</Form.Label>
        <Form.Input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter item description" name="description" />
        <Form.Label>Item price</Form.Label>
        <Form.Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Enter item price" name="price" />
        <Button disabled={disable} onClick={handleCreateItem}>Create Item</Button>
      </div>
    ) : null
  );
}

CreateItemForm.propTypes = {
  user: PropTypes.object.isRequired,
  currentCategory: PropTypes.string,
  createItem: PropTypes.func.isRequired,
  refreshItemList: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateItemForm);
