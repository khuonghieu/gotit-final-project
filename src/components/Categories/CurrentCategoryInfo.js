import React, { useState } from 'react';
import { connect } from 'react-redux';
import { viewCategory } from '../../actions/categories';

function mapStateToProps(state) {
  return {
    categoryId: state.categories.currentCategory,
  };
}

const mapDispatchToProps = (dispatch) => ({
  viewCategory: (categoryId) => dispatch(viewCategory(categoryId)),
});

export function CurrentCategoryInfo({ categoryId, viewCategory }) {
  const [categoryInfo, setCategoryInfo] = useState({});

  // Must use React.useEffect, else the unit test wont work
  React.useEffect(() => {
    (async () => {
      const { payload } = await viewCategory(categoryId);
      setCategoryInfo(payload);
    })();
  }, [categoryId, viewCategory]);

  return (
    <div>
      {categoryInfo ? (
        <p>
          category name:
          {' '}
          {categoryInfo.name}
          <br />
          category desc:
          {' '}
          {categoryInfo.description}
        </p>
      ) : 'No category to show'}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentCategoryInfo);
