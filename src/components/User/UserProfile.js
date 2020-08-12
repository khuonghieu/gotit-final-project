import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@gotitinc/design-system';
import { connect } from 'react-redux';

export function UserProfile({ user }) {
  return (
    <div style={{ width: 350 }}>
      <span className="u-marginRightSmall">
        <Badge variant="positive_subtle">{user.currentUser ? user.currentUser.name : 'Not logged in'}</Badge>
      </span>
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(UserProfile);
