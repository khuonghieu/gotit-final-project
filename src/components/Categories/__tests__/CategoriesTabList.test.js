import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createBrowserHistory } from 'history';
import { CategoriesTabList } from '../CategoriesTabList';

configure({ adapter: new Adapter() });

describe('components/Categories/CategoriesTabList.js', () => {
  let wrapper;
  let props;
  let tabItems;

  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    props = {
      categories: { currentCategory: null, categoriesList: [] },
      loggedIn: false,
      chooseCategory: jest.fn(),
      fetchCategories: jest.fn(),
      history: createBrowserHistory(),
    };
  });

  const update = () => {
    tabItems = wrapper.find('Tab-item');
  };

  const setup = () => {
    wrapper = shallow(
      <CategoriesTabList {...props} />,
    );
    update();
  };
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should call fetchCategories when loggedIn is true', () => {
    props = {
      ...props,
      loggedIn: true,
    };
    setup();
    expect(props.fetchCategories).toHaveBeenCalled();
  });
  it('should render correct number of tab items when receiving array of categories', () => {
    props = {
      ...props,
      categories: { currentCategory: null, categoriesList: [{ id: 1, name: 'sport' }, { id: 2, name: 'fashion' }] },
    };
    setup();
    expect(tabItems.length).toBe(2);
  });
});
