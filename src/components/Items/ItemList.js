import { Card, Button } from '@gotitinc/design-system';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { viewItems, chooseItem } from '../../actions/items';
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
});

export function ItemList({
  currentCategory, viewItems, chooseItem, chooseItemModal, editItemModal,
}) {
  const [itemList, setItemList] = useState([]);

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
  }, [currentCategory, viewItems]);

  return (
    <div>
      {itemList ? itemList.map((itemElement) => (
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
          </Card.Header>
        </Card>
      ))
        : 'No item to show'}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
