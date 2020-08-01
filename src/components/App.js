import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Button } from '@gotitinc/design-system';
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
      <Header fullWidth>
        <Header.Main>
          <Header.Left>
            <UserProfile currentUser={user.currentUser} />
          </Header.Left>
          <Header.Right>
            {!user.loggedIn && <Button onClick={signUpModal}>Sign up modal</Button>}
            {!user.loggedIn && <Button onClick={signInModal}>Sign in modal</Button>}
            <div>{user.loggedIn && (<UserSignOut />)}</div>
          </Header.Right>
        </Header.Main>
      </Header>
      <div>{!user.loggedIn && <ModalContainer modal={modal} />}</div>
      <div>{user.loggedIn && <CategoriesTabList />}</div>
    </div>

  );
}

App.propTypes = {
  user: PropTypes.object,
  modal: PropTypes.string,
  currentUser: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
