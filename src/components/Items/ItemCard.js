import { Card, Button } from '@gotitinc/design-system';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { chooseItem } from '../../actions/items';
import { chooseModal } from '../../actions/modals';
import * as constants from '../../constants/actions';

export function ItemCard({
  user, itemElement, currentCategory, chooseItem, chooseModal, refreshItemList,
}) {
  const history = useHistory();
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          Item name:
          {' '}
          {itemElement.name}
        </Card.Title>
        <Button
          variant="secondary"
          size="small"
          onClick={async () => {
            await chooseItem(currentCategory, itemElement.id);
            history.push(`/catalog/${currentCategory}/${itemElement.id}`);
          }}
        >
          View item
        </Button>
        {/* Only show edit and delete buttons if the item belongs to the current user */}
        {(user.currentUser && user.currentUser.id === itemElement.user_id) ? (
          <div>
            <Button
              variant="primary"
              size="small"
              onClick={() => {
                const prefill = {
                  name: itemElement.name,
                  description: itemElement.description,
                  price: itemElement.price,
                  id: itemElement.id,
                };
                chooseModal(constants.EDIT_ITEM_MODAL, prefill, refreshItemList);
              }}
            >
              Edit item
            </Button>
            <Button
              variant="negative"
              size="small"
              onClick={() => {
                const prefill = {
                  categoryId: currentCategory,
                  itemId: itemElement.id,
                };
                chooseModal(constants.DELETE_ITEM_MODAL, prefill, refreshItemList);
              }}
            >
              Delete item
            </Button>
          </div>
        ) : null}

      </Card.Header>
    </Card>
  );
}

ItemCard.propTypes = {
  user: PropTypes.object.isRequired,
  itemElement: PropTypes.object.isRequired,
  currentCategory: PropTypes.string.isRequired,
  chooseItem: PropTypes.func.isRequired,
  chooseModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    currentCategory: state.categories.currentCategory,
    user: state.user,
  };
}

const mapDispatchToProps = {
  chooseItem,
  chooseModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);
