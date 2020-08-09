import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createBrowserHistory } from 'history';
import { UserSignOut } from '../UserSignOut';

configure({ adapter: new Adapter() });

describe('components/User/UserSignOut.js', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      signOut: jest.fn(),
      chooseModal: jest.fn(),
      history: createBrowserHistory(),
    };
  });
  const setup = () => {
    wrapper = shallow(
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
    expect(props.chooseModal).toHaveBeenCalled();
  });
});
