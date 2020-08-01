import { Tab } from '@gotitinc/design-system';
import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { chooseCategory, viewCategories } from '../../actions/categories';
import CurrentCategoryInfo from './CurrentCategoryInfo';
import CreateCategoryForm from './CreateCategoryForm';

function mapStateToProps(state) {
  return {
    categories: state.categories,
    loggedIn: state.user.loggedIn,
  };
}

const mapDispatchToProps = (dispatch) => ({
  onChooseCategory: (category) => dispatch(chooseCategory(category)),
  onViewCategories: (offset, limit) => dispatch(viewCategories(offset, limit)),
});

function categoriesTabList({
  categories, loggedIn, onChooseCategory, onViewCategories,
}) {
  useEffect(() => {
    if (loggedIn) {
      onViewCategories();
    }
  }, [loggedIn, onViewCategories, categories.categoriesList]);
  return (
    <div>
      <Tab
        current={categories.currentCategory}
        onSelect={onChooseCategory}
      >
        {categories.categoriesList ? categories.categoriesList.map((categoryElement) => (<Tab.Item eventKey={categoryElement.id}>{categoryElement.name}</Tab.Item>)) : 'null'}
      </Tab>
      <CurrentCategoryInfo categoryId={categories.currentCategory} />
      <CreateCategoryForm />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(categoriesTabList);
