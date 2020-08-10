import { Tab } from '@gotitinc/design-system';
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import PropTypes from 'prop-types';
import { chooseCategory, fetchCategories } from '../../actions/categories';
import CurrentCategoryInfo from './CurrentCategoryInfo';
import ItemList from '../Items/ItemList';

function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

const mapDispatchToProps = {
  chooseCategory,
  fetchCategories,
};

export function CategoriesTabList({
  categories, chooseCategory, fetchCategories,
}) {
  const history = useHistory();
  const params = useParams();

  const onChooseCategory = useCallback((category) => {
    chooseCategory(category);
    history.push(`/catalog/${category}`);
  }, [chooseCategory, history]);

  useEffect(() => {
    (async () => {
      const res = await fetchCategories(0, 10);
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
    </div>
  );
}

CategoriesTabList.propTypes = {
  categories: PropTypes.object.isRequired,
  chooseCategory: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTabList);
