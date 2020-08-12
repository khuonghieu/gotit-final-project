import React, * as fromReact from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CurrentCategoryInfo } from '../CurrentCategoryInfo';

configure({ adapter: new Adapter() });

describe('components/Categories/CurrentCategoryInfo.js', () => {
  let wrapper;
  let props;
  let useEffect;
  let useState;
  beforeEach(() => {
    useEffect = jest.spyOn(fromReact, 'useEffect');
    useState = jest.spyOn(fromReact, 'useState');
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
    useEffect.mockImplementation((f) => f());
    props.viewCategory.mockReturnValue({ payload: {} });
    setup();
    wrapper.setProps({ ...props, categoryId: '1' });
    expect(props.viewCategory).toHaveBeenCalled();
  });

  it('should set category info according to the fetched info', async () => {
    const setState = jest.fn();
    useEffect.mockImplementation((f) => f());

    useState.mockImplementation((init) => [init, setState]);
    props = {
      categoryId: '1',
      viewCategory: jest.fn(),
    };
    props.viewCategory.mockReturnValue({ payload: {} });
    await setup();
    expect(setState).toHaveBeenCalled();
  });
});
