import { Card, Button, EmptyState } from '@gotitinc/design-system';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { viewItems, chooseItem, deteleItem } from '../../actions/items';
import { chooseItemModal, editItemModal } from '../../actions/changeModal';
import CreateItemForm from './CreateItemForm';
import * as constants from '../../constants/actions';

function mapStateToProps(state) {
  return {
    currentCategory: state.categories.currentCategory,
    editComplete: state.modal === constants.EDIT_ITEM_MODAL,
  };
}

const mapDispatchToProps = (dispatch) => ({
  viewItems: (categoryId, offset, limit) => dispatch(viewItems(categoryId, offset, limit)),
  chooseItem: (categoryId, itemId) => dispatch(chooseItem(categoryId, itemId)),
  chooseItemModal: () => dispatch(chooseItemModal),
  editItemModal: () => dispatch(editItemModal),
  deleteItem: (categoryId, itemId) => dispatch(deteleItem(categoryId, itemId)),
});

export function ItemList({
  editComplete, currentCategory, viewItems, chooseItem, chooseItemModal, editItemModal, deleteItem,
}) {
  const [itemList, setItemList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  function refreshItemList() {
    setRefresh(!refresh);
  }

  useEffect(() => {
    (async () => {
      if (currentCategory) {
        const { success, payload } = await viewItems(currentCategory, 0, 10);
        if (success) {
          setItemList(payload.items);
        } else {
          console.log(payload);
        }
      }
    })();
  }, [currentCategory, viewItems, refresh, editComplete]);

  return (
    <div>
      <CreateItemForm refreshItemList={refreshItemList} />
      <hr />
      {itemList.length > 0 ? itemList.map((itemElement) => (
        <Card key={itemElement.id}>
          <Card.Header>
            <Card.Title>
              Item name:
              {' '}
              {itemElement.name}
            </Card.Title>
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
          </Card.Header>
        </Card>
      ))
        : (
          <div style={{ maxWidth: 300 }}>
            <EmptyState name="searchResult">
              <EmptyState.Heading>
                Empty search results
              </EmptyState.Heading>
              <EmptyState.Description>
                No item found.
              </EmptyState.Description>
            </EmptyState>
          </div>
        )}
    </div>
  );
}

ItemList.propTypes = {
  editComplete: PropTypes.bool,
  currentCategory: PropTypes.number,
  viewItems: PropTypes.func,
  chooseItem: PropTypes.func,
  chooseItemModal: PropTypes.func,
  editItemModal: PropTypes.func,
  deleteItem: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
