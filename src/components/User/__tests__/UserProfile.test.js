import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createBrowserHistory } from 'history';
import { UserProfile } from '../UserProfile';

configure({ adapter: new Adapter() });

describe('components/User/UserProfile.js', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      user: {},
    };
  });
  const setup = () => {
    wrapper = shallow(
      <UserProfile {...props} />,
    );
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should display "not logged in" if currentUser is null', () => {
    setup();
    expect(wrapper.text()).toBe('Not logged in');
  });

  it('should display current user name', () => {
    props = {
      ...props,
      user: {
        loggedIn: true,
        currentUser: {
          id: 1,
          username: 'user',
          email: 'user@gotitapp.co',
          name: 'testuser',
          created: '2015-08-05T08:40:51.620Z',
          updated: '2018-04-03T08:40:51.620Z',
        },
      },

    };
    setup();
    expect(wrapper.text()).toBe('testuser');
  });
});
