import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { viewCategory } from '../../actions/categories';

function mapStateToProps(state) {
  return {
    categoryId: state.categories.currentCategory,
  };
}

const mapDispatchToProps = {
  viewCategory,
};

export function CurrentCategoryInfo({ categoryId, viewCategory }) {
  const [categoryInfo, setCategoryInfo] = useState({});

  // Fetch category detail on render
  useEffect(() => {
    (async () => {
      const { payload } = await viewCategory(categoryId);
      setCategoryInfo(payload);
    })();
  }, [categoryId, viewCategory]);

  return (
    <div>
      {categoryInfo ? (
        <p>
          <b>Category info</b>
          <br />
          Category name:
          {' '}
          {categoryInfo.name}
          <br />
          Category description:
          {' '}
          {categoryInfo.description}
        </p>
      ) : 'No category to show'}
    </div>
  );
}

CurrentCategoryInfo.propTypes = {
  categoryId: PropTypes.number,
  viewCategory: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentCategoryInfo);
