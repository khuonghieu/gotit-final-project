import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router';
import { Header, Button } from '@gotitinc/design-system';
import { chooseItem } from '../../actions/items';
import UserSignOut from '../User/UserSignOut';
import { chooseModal } from '../../actions/modals';
import * as constants from '../../constants/actions';
import UserProfile from '../User/UserProfile';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {
  chooseItem,
  chooseModal,
};

export function ItemDetails({ user, chooseItem, chooseModal }) {
  const { categoryId, itemId } = useParams(useHistory());

  const [chosenItem, setChosenItem] = useState({});
  useEffect(() => {
    (async () => {
      const result = await chooseItem(categoryId, itemId);
      setChosenItem(result.payload);
    })();
  }, [categoryId, chooseItem, itemId]);

  return (
    <div>
      <Header fullWidth>
        <Header.Main>
          <Header.Left>
            <UserProfile user={user} />
          </Header.Left>
          {user.loggedIn
            ? (
              <div>
                <Header.Right>
                  <div><UserSignOut /></div>
                </Header.Right>
              </div>
            ) : (
              <div>
                <Header.Right>
                  <Button onClick={() => chooseModal(constants.SIGN_UP_MODAL)}>Sign up</Button>
                  <Button onClick={() => chooseModal(constants.SIGN_IN_MODAL)}>Sign in</Button>
                </Header.Right>
              </div>
            )}
        </Header.Main>
      </Header>
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
  user: PropTypes.object.isRequired,
  chooseItem: PropTypes.func.isRequired,
  chooseModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
