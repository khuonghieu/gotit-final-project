import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@gotitinc/design-system';

function UserProfile({ currentUser }) {
  return (

    <div style={{ width: 350 }}>
      <span className="u-marginRightSmall">
        <Badge variant="positive_subtle">{currentUser ? currentUser.name : 'Not logged in'}</Badge>
      </span>
    </div>

  );
}

UserProfile.propTypes = {
  currentUser: PropTypes.object,
};

export default UserProfile;
