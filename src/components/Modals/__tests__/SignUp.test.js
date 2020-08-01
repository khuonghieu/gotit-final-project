import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignUpModal } from '../SignUp';

configure({ adapter: new Adapter() });

describe('components/Modals/SignUp.js', () => {
  let wrapper;
  let props;
  let input;
  let button;

  const update = () => {
    input = wrapper.find('input');
    button = wrapper.find('button');
  };

  const setup = () => {
    wrapper = mount(
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

  it('should close when click close button', () => {
    setup();
    const button = wrapper.find('button');
    button.at(0).simulate('click');
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should call SignIn API when form is fully filled and clicked submit button', () => {
    setup();
    input.at(0).simulate('change', { target: { value: 'testemail@gmail.com' } });
    input.at(1).simulate('change', { target: { value: 'testusername' } });
    input.at(2).simulate('change', { target: { value: 'testpassword' } });
    input.at(3).simulate('change', { target: { value: 'testname' } });
    button.at(1).simulate('click');
    expect(props.signUp).toHaveBeenCalled();
  });
});
