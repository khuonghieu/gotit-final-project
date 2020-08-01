import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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
    input = wrapper.find('input');
    button = wrapper.find('button');
  };

  const setup = () => {
    wrapper = mount(
      <SignInModal {...props} />,
    );
    update();
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should close when click close button', () => {
    setup();
    button.at(0).simulate('click');
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should call SignIn API when form is fully filled and clicked submit button', () => {
    setup();
    input.at(0).simulate('change', { target: { value: 'testuser' } });
    input.at(1).simulate('change', { target: { value: 'testpassword' } });
    button.at(1).simulate('click');
    expect(props.signIn).toHaveBeenCalled();
  });
});
