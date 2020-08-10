import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Form, Button } from '@gotitinc/design-system';
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
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call SignIn API when form is fully filled and clicked submit button', () => {
    setup();
    input.at(0).props().onChange({ target: { value: 'testuser' } });
    input.at(1).props().onChange({ target: { value: 'testpassword' } });
    update();
    button.props().onClick({ preventDefault: jest.fn() });
    expect(props.signIn).toHaveBeenCalled();
  });
});
