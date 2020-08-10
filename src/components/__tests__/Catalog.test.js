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
});
