import { Card, Button } from '@gotitinc/design-system';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { viewItems } from '../../actions/items';

function mapStateToProps(state) {
  return {
    currentCategory: state.categories.currentCategory,
  };
}

const mapDispatchToProps = (dispatch) => ({
  viewItems: (categoryId, offset, limit) => dispatch(viewItems(categoryId, offset, limit)),
});

export function ItemList({ currentCategory, viewItems }) {
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
            <Button variant="secondary" size="small">Action</Button>
          </Card.Header>
          <Card.Body>
            <p>
              Description:
              {' '}
              {itemElement.description}
            </p>
            <p>
              Item price
              {' '}
              {itemElement.price}
            </p>
          </Card.Body>
        </Card>
      ))
        : 'No item to show'}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
