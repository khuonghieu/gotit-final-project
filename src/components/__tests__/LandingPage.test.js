import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LandingPage } from '../LandingPage';

configure({ adapter: new Adapter() });

describe('components/LandingPage.js', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      user: {
        loggedIn: false,
        currentUser: null,
      },
      signUpModal: jest.fn(),
      signInModal: jest.fn(),
    };
  });

  const setup = () => {
    wrapper = shallow(
      <LandingPage {...props} />,
    );
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
});
