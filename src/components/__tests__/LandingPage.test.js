import React, * as fromReact from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reactRouter from 'react-router';
import { LandingPage } from '../LandingPage';

configure({ adapter: new Adapter() });

describe('components/LandingPage.js', () => {
  let wrapper;
  let props;
  let useEffect;
  let useHistory;

  beforeEach(() => {
    useEffect = jest.spyOn(fromReact, 'useEffect');
    useHistory = jest.spyOn(reactRouter, 'useHistory');
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
      <LandingPage {...props} />,
    );
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should go to automatically reroute to /catalog', () => {
    useEffect.mockImplementation((f) => f());
    const history = {
      push: jest.fn(),
    };
    useHistory.mockImplementation(() => history);
    setup();
    expect(history.push).toHaveBeenCalledWith('/catalog');
  });
});
