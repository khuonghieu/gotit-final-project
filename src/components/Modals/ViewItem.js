import React from 'react';
import { connect } from 'react-redux';
import { Modal } from '@gotitinc/design-system';

function mapStateToProps(state) {
  return {
    item: state.item,
  };
}

export function ViewItem({ onClose, item }) {
  return (
    <Modal size="small" relative centered onHide={onClose}>
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title>Item Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="u-textCenter">
          <img src="holder.js/100px90?text=Image" className="u-maxWidthFull u-marginBottomExtraSmall" alt="" />
        </div>
        <div>
          Item name:
          {' '}
          {item.name}
        </div>
        <div>
          Item description:
          {' '}
          {item.description}
        </div>
        <div>
          Item price:
          {' '}
          {item.price}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default connect(mapStateToProps, null)(ViewItem);
