import { Tab } from '@gotitinc/design-system';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { chooseCategory, fetchCategories } from '../../actions/categories';
import CurrentCategoryInfo from './CurrentCategoryInfo';

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
    history.push(`/catalog/category/${category}`);
  }

  React.useEffect(() => {
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
        {(categories.categoriesList) ? categories.categoriesList.map((categoryElement) => (<Tab.Item eventKey={categoryElement.id} key={categoryElement.id}>{categoryElement.name}</Tab.Item>)) : 'null'}
      </Tab>
      <CurrentCategoryInfo />
      {/* <CreateCategoryForm /> */}
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesTabList));
