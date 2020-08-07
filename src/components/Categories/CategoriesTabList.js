import { Tab } from '@gotitinc/design-system';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import PropTypes from 'prop-types';
import { chooseCategory, fetchCategories } from '../../actions/categories';
import CurrentCategoryInfo from './CurrentCategoryInfo';
import ItemList from '../Items/ItemList';
import { fetchUserInfo } from '../../actions/users';

function mapStateToProps(state) {
  return {
    categories: state.categories,
    loggedIn: state.user.loggedIn,
  };
}

const mapDispatchToProps = {
  chooseCategory,
  fetchCategories,
  fetchUserInfo,
};

export function CategoriesTabList({
  categories, chooseCategory, fetchCategories, fetchUserInfo, loggedIn,
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
      } else {
        chooseCategory(null);
      }
    })();
    // TODO: add comment for loggedIn usage
  }, [chooseCategory, fetchCategories, params.categoryId, loggedIn, fetchUserInfo]);

  return (
    <div>
      <Tab
        current={categories.currentCategory}
        onSelect={onChooseCategory}
      >
        {(categories.categoriesList) ? categories.categoriesList.map(
          (categoryElement) => (
            <Tab.Item
              eventKey={categoryElement.id}
              key={categoryElement.id}
            >
              {categoryElement.name}
            </Tab.Item>
          ),
        ) : null}
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
  fetchUserInfo: PropTypes.func,
  loggedIn: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTabList);
