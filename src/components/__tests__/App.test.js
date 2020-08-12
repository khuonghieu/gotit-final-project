import React, * as fromReact from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header, Button } from '@gotitinc/design-system';
import { App } from '../App';
import { UserSignOut } from '../User/UserSignOut';

configure({ adapter: new Adapter() });

describe('components/App.js', () => {
  let wrapper;
  let props;
  let useEffect;
  beforeEach(() => {
    useEffect = jest.spyOn(fromReact, 'useEffect');
    props = {
      user: {
        loggedIn: false,
        currentUser: null,
      },
      fetchUserInfo: jest.fn(),
      chooseModal: jest.fn(),
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

  it('should fetch user info when change loggedIn status', () => {
    useEffect.mockImplementation((f) => f());
    setup();
    wrapper.setProps({
      ...props,
      user: {
        loggedIn: true,
        currentUser: null,
      },
    });
    expect(props.fetchUserInfo).toHaveBeenCalled();
  });

  it('should show UserSignOut when logged in', () => {
    props = {
      ...props,
      user: {
        loggedIn: true,
        currentUser: null,
      },
    };
    setup();
    const signOutButton = wrapper.find(Header.Right);
    expect(signOutButton.length).toBe(1);
  });

  it('should show sign up and sign in button when not logged in', () => {
    props = {
      ...props,
      user: {
        loggedIn: false,
        currentUser: null,
      },
    };
    setup();
    const buttons = wrapper.find(Button);
    expect(buttons.length).toBe(2);
  });

  it('should call chooseModal when click signin buttons', () => {
    props = {
      ...props,
      user: {
        loggedIn: false,
        currentUser: null,
      },
    };
    setup();
    const buttons = wrapper.find(Button);
    buttons.at(1).props().onClick();
    expect(props.chooseModal).toHaveBeenCalled();
  });
  it('should call chooseModal when click signup buttons', () => {
    props = {
      ...props,
      user: {
        loggedIn: false,
        currentUser: null,
      },
    };
    setup();
    const buttons = wrapper.find(Button);
    buttons.at(0).props().onClick();
    expect(props.chooseModal).toHaveBeenCalled();
  });
});
