import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalContainer } from '../index';

configure({ adapter: new Adapter() });

describe('components/Modals/index.js', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      modal: null,
      onCloseModal: jest.fn(),
    };
  });
  const setup = () => {
    wrapper = shallow(
      <ModalContainer {...props} />,
    );
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
});
