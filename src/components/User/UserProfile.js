import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@gotitinc/design-system';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getToken } from '../../utilities/localStorage';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export function UserProfile({ user, history }) {
  useEffect(() => {
    if (!getToken() || !user.loggedIn) {
      history.push('/');
    }
  }, [history, user.loggedIn]);
  return (
    <div style={{ width: 350 }}>
      <span className="u-marginRightSmall">
        <Badge variant="positive_subtle">{user.currentUser ? user.currentUser.name : 'Not logged in'}</Badge>
      </span>
    </div>

  );
}

UserProfile.propTypes = {
  currentUser: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, null)(UserProfile));
