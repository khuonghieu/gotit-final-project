import { Tab } from '@gotitinc/design-system';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { chooseCategory, fetchCategories } from '../../actions/categories';
import CurrentCategoryInfo from './CurrentCategoryInfo';
import ItemList from '../Items/ItemList';

function mapStateToProps(state) {
  return {
    categories: state.categories,
    loggedIn: state.user.loggedIn,
  };
}

const mapDispatchToProps = (dispatch) => ({
  chooseCategory: (category) => dispatch(chooseCategory(category)),
  fetchCategories: (offset, limit) => dispatch(fetchCategories(offset, limit)),
});

export function CategoriesTabList({
  categories, loggedIn, chooseCategory, fetchCategories, history,
}) {
  function onChooseCategory(category) {
    chooseCategory(category);
  }

  useEffect(() => {
    if (loggedIn) {
      fetchCategories(0, 10);
    }
  }, [fetchCategories, loggedIn]);
  return (
    <div>
      <Tab
        current={categories.currentCategory}
        onSelect={onChooseCategory}
      >
        {(categories.categoriesList) ? categories.categoriesList.map((categoryElement) => (<Tab.Item eventKey={categoryElement.id} key={categoryElement.id}>{categoryElement.name}</Tab.Item>)) : null}
      </Tab>
      <hr />
      {history.location.pathname === '/catalog' ? <CurrentCategoryInfo /> : null}
      <hr />
      <ItemList />
      {/* <CreateCategoryForm /> */}
    </div>
  );
}

CategoriesTabList.propTypes = {
  categories: PropTypes.object,
  loggedIn: PropTypes.bool,
  chooseCategory: PropTypes.func,
  fetchCategories: PropTypes.func,
  history: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesTabList));
