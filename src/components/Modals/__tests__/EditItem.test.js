import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EditItem } from '../EditItem';

configure({ adapter: new Adapter() });

describe('components/Modals/EditItem.js', () => {
  let wrapper;
  let props;
  let input;
  let button;

  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      prefill: {
        name: 'testname',
        description: 'testdescription',
        id: 0,
        price: 0,
      },
      editItem: jest.fn(),
      categoryId: 0,
    };
  });

  const update = () => {
    input = wrapper.find('input');
    button = wrapper.find('button');
  };

  const setup = () => {
    wrapper = mount(
      <EditItem {...props} />,
    );
    update();
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should close when click close button', () => {
    setup();
    button.at(0).simulate('click');
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should call SignIn API when form is fully filled and clicked submit button', () => {
    setup();
    input.at(0).simulate('change', { target: { value: 'testname1' } });
    input.at(1).simulate('change', { target: { value: 'testdescription1' } });
    input.at(2).simulate('change', { target: { value: 5 } });
    button.at(1).simulate('click');
    expect(props.editItem).toHaveBeenCalled();
  });
});
