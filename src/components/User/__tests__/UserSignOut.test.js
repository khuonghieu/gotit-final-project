import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UserSignOut } from '../UserSignOut';

configure({ adapter: new Adapter() });

describe('components/User/UserProfile.js', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      signOut: jest.fn(),
      signOutModal: jest.fn(),
    };
  });
  const setup = () => {
    wrapper = mount(
      <UserSignOut {...props} />,
    );
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call SignOut API when click button', () => {
    setup();
    const button = wrapper.find('Button');
    button.simulate('click');
    expect(props.signOut).toHaveBeenCalled();
  });
  it('should call SignOutModal API when click button', () => {
    setup();
    const button = wrapper.find('Button');
    button.simulate('click');
    expect(props.signOutModal).toHaveBeenCalled();
  });
});
