import { EmptyState, Pagination } from '@gotitinc/design-system';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router';
import queryString from 'query-string';
import { viewItems } from '../../actions/items';
import CreateItemForm from './CreateItemForm';
import ItemCard from './ItemCard';

export function ItemList({
  currentCategory, viewItems, user,
}) {
  const [itemList, setItemList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  function refreshItemList() {
    setRefresh(!refresh);
  }
  const [itemQuantity, setItemQuantity] = useState(0);

  const history = useHistory();

  const location = useLocation();
  const parsed = queryString.parse(location.search);

  // Limit fetch quantity to be 3, offset is tuned accordingly
  const offset = 3 * (Number.parseInt(parsed.page, 10) - 1);

  // If a category is chosen, fetch that category's items with the precalculated offset
  useEffect(() => {
    (async () => {
      if (currentCategory && !Number.isNaN(offset)) {
        const { success, payload } = await viewItems(currentCategory, offset, 3);
        if (success) {
          setItemList(payload.items);
          setItemQuantity(payload.total_items);
        }
      }
    })();
  }, [currentCategory, viewItems, refresh, parsed.page, offset]);

  return (
    <div>
      {user.loggedIn && <CreateItemForm refreshItemList={refreshItemList} />}
      <hr />
      {itemList.length > 0 ? itemList.map((itemElement) => (
        <ItemCard
          key={itemElement.id}
          itemElement={itemElement}
          refreshItemList={refreshItemList}
        />
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
          {[...Array(Math.ceil(itemQuantity / 3)).keys()].map((key) => (
            <Pagination.Item key={key + 1} active={parsed.page === (key + 1).toString()} onClick={() => history.push(`/catalog/${currentCategory}?page=${key + 1}`)}>{key + 1}</Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
}

ItemList.propTypes = {
  currentCategory: PropTypes.string,
  viewItems: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    currentCategory: state.categories.currentCategory,
    user: state.user,
  };
}

const mapDispatchToProps = {
  viewItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
