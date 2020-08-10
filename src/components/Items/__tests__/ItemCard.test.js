import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from '@gotitinc/design-system';
import reactRouter from 'react-router';
import { ItemCard } from '../ItemCard';

configure({ adapter: new Adapter() });

describe('components/Items/ItemCard.js', () => {
  let wrapper;
  let props;
  let useHistory;

  beforeEach(() => {
    useHistory = jest.spyOn(reactRouter, 'useHistory');
    props = {
      user: { currentUser: { id: 1 } },
      itemElement: { user_id: 1 },
      refreshItemList: jest.fn(),
      currentCategory: 1,
      chooseItem: jest.fn(),
      chooseModal: jest.fn(),
      editItemModal: jest.fn(),
      deleteItem: jest.fn(),
    };
  });

  const setup = () => {
    wrapper = shallow(
      <ItemCard {...props} />,
    );
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should push to history object when click view item', async () => {
    const history = {
      push: jest.fn(),
    };
    useHistory.mockImplementation(() => history);
    setup();
    const buttons = wrapper.find(Button);
    await buttons.at(0).props().onClick();
    expect(history.push).toHaveBeenCalled();
  });

  it('should choose modal when view or edit item button is clicked', () => {
    setup();
    const buttons = wrapper.find(Button);
    buttons.at(1).props().onClick();
    expect(props.chooseModal).toHaveBeenCalled();
  });

  it('should call delete item API when delete item button is clicked', () => {
    setup();
    const buttons = wrapper.find(Button);
    buttons.at(2).props().onClick();
    expect(props.deleteItem).toHaveBeenCalled();
  });
});
