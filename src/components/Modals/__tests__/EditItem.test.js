import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Message, Form, Button } from '@gotitinc/design-system';
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
      categoryId: '0',
    };
  });

  const update = () => {
    input = wrapper.find(Form.Input);
    button = wrapper.find(Button);
  };

  const setup = () => {
    wrapper = shallow(
      <EditItem {...props} />,
    );
    update();
  };

  it('should render correctly', () => {
    props.editItem.mockReturnValue({ success: true, payload: {} });
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call SignIn API when form is fully filled and clicked submit button', () => {
    props.editItem.mockReturnValue({ success: true, payload: {} });
    setup();
    input.at(0).props().onChange({ target: { value: 'testname1' } });
    input.at(1).props().onChange({ target: { value: 'testdescription1' } });
    input.at(2).props().onChange({ target: { value: 5 } });
    update();
    button.props().onClick({ preventDefault: jest.fn() });
    expect(props.editItem).toHaveBeenCalled();
  });

  it('should display error message when all fields are not fully filled', () => {
    props.editItem.mockReturnValue({ success: true, payload: {} });
    setup();
    button.props().onClick({ preventDefault: jest.fn() });
    expect(wrapper.find(Message).length).toBe(1);
  });
  it('should display error message when edit item failed', async () => {
    props.editItem.mockReturnValue({ success: false, payload: { message: 'error' } });
    setup();
    input.at(0).props().onChange({ target: { value: 'testname1' } });
    input.at(1).props().onChange({ target: { value: 'testdescription1' } });
    input.at(2).props().onChange({ target: { value: 5 } });
    update();
    await button.props().onClick({ preventDefault: jest.fn() });
    expect(wrapper.find(Message).length).toBe(1);
  });

  it('should close when edit item success', async () => {
    props.editItem.mockReturnValue({ success: true, payload: {} });
    setup();
    input.at(0).props().onChange({ target: { value: 'testname1' } });
    input.at(1).props().onChange({ target: { value: 'testdescription1' } });
    input.at(2).props().onChange({ target: { value: 5 } });
    update();
    await button.props().onClick({ preventDefault: jest.fn() });
    expect(props.onClose).toHaveBeenCalled();
  });
});
