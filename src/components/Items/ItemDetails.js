import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { chooseItem } from '../../actions/items';

const mapDispatchToProps = {
  chooseItem,
};

export function ItemDetails({ chooseItem }) {
  const { categoryId, itemId } = useParams();

  const [chosenItem, setChosenItem] = useState({});
  useEffect(() => {
    (async () => {
      const result = await chooseItem(categoryId, itemId);
      setChosenItem(result.payload);
    })();
  }, [categoryId, chooseItem, itemId]);

  return (
    <div>
      <div>
        Item name:
        {' '}
        {chosenItem.name}
      </div>
      <div>
        Item description:
        {' '}
        {chosenItem.description}
      </div>
      <div>
        Item price:
        {' '}
        {chosenItem.price}
      </div>
    </div>
  );
}

ItemDetails.propTypes = {

  chooseItem: PropTypes.func.isRequired,

};

export default connect(null, mapDispatchToProps)(ItemDetails);
