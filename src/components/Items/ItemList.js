import { EmptyState } from '@gotitinc/design-system';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { viewItems } from '../../actions/items';
import CreateItemForm from './CreateItemForm';
import * as constants from '../../constants/actions';
import ItemCard from './ItemCard';

function mapStateToProps(state) {
  return {
    currentCategory: state.categories.currentCategory,
    editComplete: state.modal === constants.EDIT_ITEM_MODAL,
  };
}

const mapDispatchToProps = (dispatch) => ({
  viewItems: (categoryId, offset, limit) => dispatch(viewItems(categoryId, offset, limit)),
});

export function ItemList({
  editComplete, currentCategory, viewItems,
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
        <ItemCard key={itemElement.id} itemElement={itemElement} refreshItemList={refreshItemList} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
