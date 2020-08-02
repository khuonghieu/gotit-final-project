import { Tab } from '@gotitinc/design-system';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { chooseCategory, fetchCategories } from '../../actions/categories';
import CurrentCategoryInfo from './CurrentCategoryInfo';
import CreateCategoryForm from './CreateCategoryForm';

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

function CategoriesTabList({
  categories, loggedIn, chooseCategory, fetchCategories,
}) {
  useEffect(() => {
    if (loggedIn) {
      fetchCategories(0, 10);
    }
  }, [fetchCategories, loggedIn]);
  return (
    <div>
      <Tab
        current={categories.currentCategory}
        onSelect={chooseCategory}
      >
        {(categories.categoriesList) ? categories.categoriesList.map((categoryElement) => (<Tab.Item eventKey={categoryElement.id}>{categoryElement.name}</Tab.Item>)) : 'null'}
      </Tab>
      <CurrentCategoryInfo />
      <CreateCategoryForm />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTabList);
