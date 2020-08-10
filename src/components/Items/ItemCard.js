import { Card, Button } from '@gotitinc/design-system';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { viewItems, chooseItem, deleteItem } from '../../actions/items';
import { chooseModal } from '../../actions/modals';
import * as constants from '../../constants/actions';

function mapStateToProps(state) {
  return {
    currentCategory: state.categories.currentCategory,
    user: state.user,
  };
}

const mapDispatchToProps = {
  viewItems,
  chooseItem,
  deleteItem,
  chooseModal,
};

export function ItemCard({
  user, itemElement, currentCategory, chooseItem, deleteItem, refreshItemList, chooseModal,
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
                chooseModal(constants.EDIT_ITEM_MODAL, prefill);
              }}
            >
              Edit item
            </Button>
            <Button
              variant="negative"
              size="small"
              onClick={async () => {
                await deleteItem(currentCategory, itemElement.id);
                refreshItemList();
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
  currentCategory: PropTypes.number.isRequired,
  chooseItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  refreshItemList: PropTypes.func.isRequired,
  chooseModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);
