import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from '@gotitinc/design-system';
import { ItemCard } from '../ItemCard';

configure({ adapter: new Adapter() });

describe('components/Items/ItemCard.js', () => {
  let wrapper;
  let props;

  beforeEach(() => {
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

  it('should choosemodal when view or edit item button is clicked', () => {
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
