import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Form, Button } from '@gotitinc/design-system';
import { SignUpModal } from '../SignUp';

configure({ adapter: new Adapter() });

describe('components/Modals/SignUp.js', () => {
  let wrapper;
  let props;
  let input;
  let button;

  const update = () => {
    input = wrapper.find(Form.Input);
    button = wrapper.find(Button);
  };

  const setup = () => {
    wrapper = shallow(
      <SignUpModal {...props} />,
    );
    update();
  };
  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      signUp: jest.fn(),
    };
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call SignIn API when form is fully filled and clicked submit button', () => {
    setup();
    input.at(0).simulate('change', { target: { value: 'testemail@gmail.com' } });
    input.at(1).simulate('change', { target: { value: 'testusername' } });
    input.at(2).simulate('change', { target: { value: 'testpassword' } });
    input.at(3).simulate('change', { target: { value: 'testname' } });
    button.props().onClick();
    expect(props.signUp).toHaveBeenCalled();
  });
});
