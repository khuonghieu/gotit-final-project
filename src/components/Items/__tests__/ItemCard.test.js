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
      itemElement: {},
      refreshItemList: jest.fn(),
      currentCategory: 1,
      chooseItem: jest.fn(),
      chooseItemModal: jest.fn(),
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

  it('should open preview item modal when view item button is clicked', () => {
    setup();
    const buttons = wrapper.find(Button);
    buttons.at(0).simulate('click');
    expect(props.chooseItemModal).toHaveBeenCalled();
  });

  it('should open edit item modal when edit item button is clicked', async () => {
    setup();
    const buttons = wrapper.find(Button);
    await buttons.at(1).simulate('click');
    expect(props.editItemModal).toHaveBeenCalled();
  });

  it('should call delete item API when delete item button is clicked', () => {
    setup();
    const buttons = wrapper.find(Button);
    buttons.at(2).simulate('click');
    expect(props.deleteItem).toHaveBeenCalled();
  });
});
