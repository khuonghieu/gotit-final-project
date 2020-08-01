import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { get } from '../../utilities/request';

function mapStateToProps(state) {
  return {
    categoryId: state.categories.currentCategory,
  };
}

const mapDispatchToProps = (dispatch) => ({

});

function CurrentCategoryInfo({ categoryId }) {
  useEffect(() => {

  }, []);

  return (
    <div>
      <p>
        category name:
        {' '}
        {categoryInfo.name}
      </p>
      <p>
        category desc:
        {' '}
        {categoryInfo.description}
      </p>
    </div>
  );
}

export default connect(mapStateToProps, null)(CurrentCategoryInfo);
