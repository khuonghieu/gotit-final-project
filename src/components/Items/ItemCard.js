import { Card, Button } from '@gotitinc/design-system';
import React, { } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { viewItems, chooseItem, deteleItem } from '../../actions/items';
import { chooseItemModal, editItemModal } from '../../actions/changeModal';

function mapStateToProps(state) {
  return {
    currentCategory: state.categories.currentCategory,
  };
}

const mapDispatchToProps = (dispatch) => ({
  viewItems: (categoryId, offset, limit) => dispatch(viewItems(categoryId, offset, limit)),
  chooseItem: (categoryId, itemId) => dispatch(chooseItem(categoryId, itemId)),
  chooseItemModal: () => dispatch(chooseItemModal),
  editItemModal: () => dispatch(editItemModal),
  deleteItem: (categoryId, itemId) => dispatch(deteleItem(categoryId, itemId)),
});

export function ItemCard({
  itemElement, currentCategory, chooseItem, chooseItemModal, editItemModal, deleteItem, refreshItemList, history,
}) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          Item name:
          {' '}
          {itemElement.name}
        </Card.Title>
        {history.location.pathname === '/profile' ? (
          <div>
            <Button
              variant="secondary"
              size="small"
              onClick={() => {
                chooseItem(currentCategory, itemElement.id);
                chooseItemModal();
              }}
            >
              View item
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={async () => {
                await chooseItem(currentCategory, itemElement.id);
                editItemModal();
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemCard));
