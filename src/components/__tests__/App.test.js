import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from '../App';

configure({ adapter: new Adapter() });

describe('components/App.js', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      user: {
        loggedIn: false,
        currentUser: null,
      },
      modal: null,
      onFetchUserInfo: jest.fn(),
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
  it('should not fetch user info when not logged in ', () => {
    setup();
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    expect(props.onFetchUserInfo).not.toHaveBeenCalled();
  });
});
