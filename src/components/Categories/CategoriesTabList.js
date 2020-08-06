import { Tab } from '@gotitinc/design-system';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
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

const mapDispatchToProps = {
  chooseCategory,
  fetchCategories,
};

export function CategoriesTabList({
  categories, chooseCategory, fetchCategories, loggedIn,
}) {
  const history = useHistory();
  const params = useParams(history);

  function onChooseCategory(category) {
    chooseCategory(category);
    history.push(`/catalog/${category}`);
  }

  useEffect(() => {
    (async () => {
      await fetchCategories(0, 10);
      if (params.categoryId) {
        chooseCategory(params.categoryId);
      }
    })();
  }, [chooseCategory, fetchCategories, params.categoryId, loggedIn]);
  return (
    <div>
      <Tab
        current={categories.currentCategory}
        onSelect={onChooseCategory}
      >
        {(categories.categoriesList) ? categories.categoriesList.map((categoryElement) => (<Tab.Item eventKey={categoryElement.id} key={categoryElement.id}>{categoryElement.name}</Tab.Item>)) : null}
      </Tab>
      <hr />
      <CurrentCategoryInfo />
      <hr />
      <ItemList />
      {/* <CreateCategoryForm /> */}
    </div>
  );
}

CategoriesTabList.propTypes = {
  categories: PropTypes.object,
  chooseCategory: PropTypes.func,
  fetchCategories: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTabList);
