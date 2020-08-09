import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button, Header } from '@gotitinc/design-system';
import { Catalog } from '../Catalog';

configure({ adapter: new Adapter() });

describe('components/Catalog.js', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      user: {
        loggedIn: false,
        currentUser: null,
      },
      chooseModal: jest.fn(),
    };
  });

  const setup = () => {
    wrapper = shallow(
      <Catalog {...props} />,
    );
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should show sign out button when logged in', () => {
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
});
