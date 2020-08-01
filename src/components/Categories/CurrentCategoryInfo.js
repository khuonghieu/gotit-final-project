import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { viewCategory } from '../../actions/categories';

function mapStateToProps(state) {
  return {
    categoryId: state.categories.currentCategory,
  };
}

function CurrentCategoryInfo({ categoryId }) {
  const [categoryInfo, setCategoryInfo] = useState({});
  useEffect(() => {
    async () => {
      const result = await viewCategory(categoryId);
      setCategoryInfo(result.payload);
    };
  }, [categoryId]);

  return (
    <div>
      {categoryInfo.categories ? (
        <p>
          category name:
          {' '}
          {categoryInfo.name}
          category desc:
          {' '}
          {categoryInfo.description}
        </p>
      ) : 'No category to show'}
    </div>
  );
}

export default connect(mapStateToProps, null)(CurrentCategoryInfo);
