import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CurrentCategoryInfo } from '../CurrentCategoryInfo';

configure({ adapter: new Adapter() });

describe('components/Categories/CurrentCategoryInfo.js', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    props = {
      categoryId: null,
      viewCategory: jest.fn(),
    };
  });
  const setup = () => {
    wrapper = shallow(
      <CurrentCategoryInfo {...props} />,
    );
  };
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should get category info when change categoryId', () => {
    setup();
    wrapper.setProps({ ...props, categoryId: 1 });
    expect(props.viewCategory).toHaveBeenCalled();
  });
});
