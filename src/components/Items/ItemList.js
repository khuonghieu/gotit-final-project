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
    editComplete: state.modal.modalChosen === constants.EDIT_ITEM_MODAL,
  };
}

const mapDispatchToProps = {
  viewItems,
};

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
        }
      }
    })();
  }, [currentCategory, viewItems, refresh, editComplete]);

  return (
    <div>
      <CreateItemForm refreshItemList={refreshItemList} />
      <hr />
      {itemList.length > 0 ? itemList.map((itemElement) => (
        <ItemCard itemElement={itemElement} refreshItemList={refreshItemList} />
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
  currentCategory: PropTypes.string,
  viewItems: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
