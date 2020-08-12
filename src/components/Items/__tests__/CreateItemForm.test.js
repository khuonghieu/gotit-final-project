import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button, Form, Message } from '@gotitinc/design-system';
import { CreateItemForm } from '../CreateItemForm';

configure({ adapter: new Adapter() });

describe('components/Items/CreateItemForm.js', () => {
  let wrapper;
  let props;
  let input;
  let button;

  const update = () => {
    input = wrapper.find(Form.Input);
    button = wrapper.find(Button);
  };

  beforeEach(() => {
    props = {
      currentCategory: '1',
      createItem: jest.fn(),
      refreshItemList: jest.fn(),
      user: { loggedIn: true },
    };
  });

  const setup = () => {
    wrapper = shallow(
      <CreateItemForm {...props} />,
    );
    update();
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call SignIn API when form is fully filled and clicked submit button', () => {
    props.createItem.mockReturnValue({ success: false, payload: {} });
    setup();
    input.at(0).simulate('change', { target: { value: 'testname' } });
    input.at(1).simulate('change', { target: { value: 'testdescription' } });
    input.at(2).simulate('change', { target: { value: 5 } });
    update();
    button.props().onClick({ preventDefault: jest.fn() });
    expect(props.createItem).toHaveBeenCalled();
  });

  it('should show error message when form is NOT fully filled', () => {
    props.createItem.mockReturnValue({ success: false, payload: {} });
    setup();
    input.at(0).simulate('change', { target: { value: '' } });
    input.at(1).simulate('change', { target: { value: '' } });
    input.at(2).simulate('change', { target: { value: 0 } });
    update();
    button.props().onClick({ preventDefault: jest.fn() });
    expect(wrapper.find(Message).length).toBe(1);
  });

  it('should refresh item list when done creating item', async () => {
    props.createItem.mockReturnValue({ success: false, payload: {} });
    setup();
    input.at(0).simulate('change', { target: { value: 'testname1' } });
    input.at(1).simulate('change', { target: { value: 'testdescription1' } });
    input.at(2).simulate('change', { target: { value: 6 } });
    update();
    props.createItem.mockReturnValue({ success: true, payload: {} });
    await button.props().onClick({ preventDefault: jest.fn() });
    expect(props.refreshItemList).toHaveBeenCalled();
  });
});
