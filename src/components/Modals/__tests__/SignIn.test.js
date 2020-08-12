import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Form, Button, Message } from '@gotitinc/design-system';
import { SignInModal } from '../SignIn';

configure({ adapter: new Adapter() });

describe('components/Modals/SignIn.js', () => {
  let wrapper;
  let props;
  let input;
  let button;

  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      signIn: jest.fn(),
    };
  });

  const update = () => {
    input = wrapper.find(Form.Input);
    button = wrapper.find(Button);
  };

  const setup = () => {
    wrapper = shallow(
      <SignInModal {...props} />,
    );
    update();
  };

  it('should render correctly', () => {
    props.signIn.mockReturnValue({ success: true, payload: {} });
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call SignIn API when form is fully filled and clicked submit button', () => {
    props.signIn.mockReturnValue({ success: true, payload: {} });
    setup();
    input.at(0).props().onChange({ target: { value: 'testuser' } });
    input.at(1).props().onChange({ target: { value: 'testpassword' } });
    update();
    button.props().onClick({ preventDefault: jest.fn() });
    expect(props.signIn).toHaveBeenCalled();
  });

  it('should display error message when all fields are not fully filled', () => {
    props.signIn.mockReturnValue({ success: true, payload: {} });
    setup();
    button.props().onClick({ preventDefault: jest.fn() });
    expect(wrapper.find(Message).length).toBe(1);
  });
  it('should display error message when sign in failed', async () => {
    props.signIn.mockReturnValue({ success: false, payload: { message: 'error' } });
    setup();
    input.at(0).props().onChange({ target: { value: 'testuser' } });
    input.at(1).props().onChange({ target: { value: 'testpassword' } });
    update();
    await button.props().onClick({ preventDefault: jest.fn() });
    expect(wrapper.find(Message).length).toBe(1);
  });

  it('should close when sign in success', async () => {
    props.signIn.mockReturnValue({ success: true, payload: {} });
    setup();
    input.at(0).props().onChange({ target: { value: 'testuser' } });
    input.at(1).props().onChange({ target: { value: 'testpassword' } });
    update();
    await button.props().onClick({ preventDefault: jest.fn() });
    expect(props.onClose).toHaveBeenCalled();
  });
});
