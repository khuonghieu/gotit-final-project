import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CreateItemForm } from '../CreateItemForm';

configure({ adapter: new Adapter() });

describe('components/Items/CreateItemForm.js', () => {
  let wrapper;
  let props;
  let input;
  let button;

  const update = () => {
    input = wrapper.find('input');
    button = wrapper.find('button');
  };

  beforeEach(() => {
    props = {
      currentCategory: 1,
      createItem: jest.fn(),
    };
  });

  const setup = () => {
    wrapper = mount(
      <CreateItemForm {...props} />,
    );
    update();
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call SignIn API when form is fully filled and clicked submit button', () => {
    setup();
    input.at(0).simulate('change', { target: { value: 'testname' } });
    input.at(1).simulate('change', { target: { value: 'testdescription' } });
    input.at(2).simulate('change', { target: { value: 10 } });
    button.at(0).simulate('click');
    expect(props.createItem).toHaveBeenCalled();
  });
});
