import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Form, Button } from '@gotitinc/design-system';
import { ViewItem } from '../ViewItem';

configure({ adapter: new Adapter() });

describe('components/Modals/ViewItem.js', () => {
  let wrapper;
  let props;
  let input;
  let button;

  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      item: {
        name: 'testname',
        description: 'testdescription',
        id: 0,
        price: 0,
      },
    };
  });

  const update = () => {
    input = wrapper.find(Form.Input);
    button = wrapper.find(Button);
  };

  const setup = () => {
    wrapper = shallow(
      <ViewItem {...props} />,
    );
    update();
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  // it('should close when click close button', () => {
  //   setup();
  //   button.simulate('click');
  //   expect(props.onClose).toHaveBeenCalled();
  // });
});
