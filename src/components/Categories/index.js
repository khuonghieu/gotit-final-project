import { Tab } from '@gotitinc/design-system';
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import PropTypes from 'prop-types';
import { chooseCategory, fetchCategories } from '../../actions/categories';
import CurrentCategoryInfo from './CurrentCategoryInfo';
import ItemList from '../Items';

export function CategoriesTabList({
  categories, chooseCategory, fetchCategories,
}) {
  const history = useHistory();
  const params = useParams();

  const onChooseCategory = useCallback((category) => {
    chooseCategory(category);
    // Automatically go to first page of the first category available
    history.push(`/catalog/${category}?page=1`);
  }, [chooseCategory, history]);

  useEffect(() => {
    (async () => {
      const res = await fetchCategories(0, 10);
      // Go to first available category, or go to null if unavailable
      if (params.categoryId) {
        chooseCategory(params.categoryId);
      } else if (res.payload.categories.length > 0) {
        onChooseCategory(res.payload.categories[0].id);
      } else {
        chooseCategory(null);
      }
    })();
  }, [chooseCategory, fetchCategories, onChooseCategory, params.categoryId]);

  return (
    <div>
      {categories.categoriesList && (
      <Tab
        current={categories.currentCategory}
        onSelect={onChooseCategory}
      >
        {categories.categoriesList.map(
          (categoryElement) => (
            <Tab.Item
              eventKey={categoryElement.id}
              key={categoryElement.id}
            >
              {categoryElement.name}
            </Tab.Item>
          ),
        )}
      </Tab>
      )}
      <hr />
      <CurrentCategoryInfo />
      <hr />
      <ItemList />
    </div>
  );
}

CategoriesTabList.propTypes = {
  categories: PropTypes.object.isRequired,
  chooseCategory: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};
function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

const mapDispatchToProps = {
  chooseCategory,
  fetchCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTabList);
