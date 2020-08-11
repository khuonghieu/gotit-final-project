import { EmptyState, Pagination } from '@gotitinc/design-system';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import queryString from 'query-string';
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

  const location = useLocation();
  const parsed = queryString.parse(location.search);

  function refreshItemList() {
    setRefresh(!refresh);
  }

  // Limit fetch quantity to be 3, offset is tuned accordingly
  const offset = 3 * Number.parseInt(parsed.page, 10) - 1;

  useEffect(() => {
    (async () => {
      if (currentCategory) {
        const { success, payload } = await viewItems(currentCategory, offset, 3);
        if (success) {
          setItemList(payload.items);
        }
      }
    })();
  }, [currentCategory, viewItems, refresh, editComplete, parsed.page, offset]);

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
      <div className="u-textCenter">
        <Pagination>
          <Pagination.Item active={parsed.page === '1'} href="?page=1">1</Pagination.Item>
          <Pagination.Item active={parsed.page === '2'} href="?page=2">2</Pagination.Item>
          <Pagination.Item active={parsed.page === '3'} href="?page=3">3</Pagination.Item>
          <Pagination.Item active={parsed.page === '4'} href="?page=4">4</Pagination.Item>
          <Pagination.Item active={parsed.page === '5'} href="?page=5">5</Pagination.Item>
        </Pagination>
      </div>
    </div>
  );
}

ItemList.propTypes = {
  editComplete: PropTypes.bool.isRequired,
  currentCategory: PropTypes.string,
  viewItems: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
