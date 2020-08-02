import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Button } from '@gotitinc/design-system';
import { Route } from 'react-router-dom';
import ModalContainer from './Modals';
import UserProfile from './User/UserProfile';
import UserSignOut from './User/UserSignOut';
import { getToken } from '../utilities/localStorage';
import fetchUserInfo from '../actions/fetchUserInfo';
import { signInModal, signUpModal } from '../actions/changeModal';
import CategoriesTabList from './Categories/CategoriesTabList';

function mapStateToProps(state) {
  return {
    user: state.user,
    modal: state.modal,
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchUserInfo: () => dispatch(fetchUserInfo()),
  signUpModal: () => dispatch(signUpModal),
  signInModal: () => dispatch(signInModal),
});

export function App({
  user, modal, fetchUserInfo, signUpModal, signInModal,
}) {
  const token = getToken();

  // const [result, setResult] = useState({});

  useEffect(() => {
    if (user.loggedIn) {
      fetchUserInfo();
    }
  }, [fetchUserInfo, token, user.loggedIn]);

  return (
    <div>
      <Route
        exact
        path="/"
        render={() => (
          <div>
            <Header fullWidth>
              <Header.Main>
                <Header.Left>
                  <UserProfile user={user} />
                </Header.Left>
                <Header.Right>
                  <Button onClick={signUpModal}>Sign up modal</Button>
                  <Button onClick={signInModal}>Sign in modal</Button>
                </Header.Right>
              </Header.Main>
            </Header>
            <div>{!user.loggedIn && <ModalContainer modal={modal} />}</div>
          </div>
        )}
      />
      <Route
        path="/catalog"
        render={() => (
          <div>
            <Header fullWidth>
              <Header.Main>
                <Header.Left>
                  <UserProfile user={user} />
                </Header.Left>
                <Header.Right>
                  <div><UserSignOut /></div>
                </Header.Right>
              </Header.Main>
            </Header>
            <div><CategoriesTabList /></div>
          </div>
        )}
      />
    </div>

  );
}

App.propTypes = {
  user: PropTypes.object,
  modal: PropTypes.string,
  fetchUserInfo: PropTypes.func,
  signUpModal: PropTypes.func,
  signInModal: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
