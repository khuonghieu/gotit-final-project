import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from '../App';

configure({ adapter: new Adapter() });

describe('components/App.js', () => {
  let wrapper;
  let props;
  let useEffect;
  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    props = {
      user: {
        loggedIn: false,
        currentUser: null,
      },
      modal: null,
      fetchUserInfo: jest.fn(),
      signInModal: jest.fn(),
      signUpModal: jest.fn(),
    };
  });

  const setup = () => {
    wrapper = shallow(
      <App {...props} />,
    );
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should fetch user info when logged in ', () => {
    useEffect.mockImplementation((f) => f());
    props = {
      ...props,
      user: {
        loggedIn: true,
        currentUser: null,
      },
    };
    setup();
    expect(props.fetchUserInfo).toHaveBeenCalled();
  });
});
