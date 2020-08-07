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
              onClick={async () => {
                await chooseItem(currentCategory, itemElement.id);
                chooseModal(constants.EDIT_ITEM_MODAL);
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
  user: PropTypes.object,
  itemElement: PropTypes.object,
  currentCategory: PropTypes.string,
  chooseItem: PropTypes.func,
  deleteItem: PropTypes.func,
  refreshItemList: PropTypes.func,
  chooseModal: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);
