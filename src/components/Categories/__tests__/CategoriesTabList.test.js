import React, * as fromReact from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createBrowserHistory } from 'history';
import { Tab } from '@gotitinc/design-system';
import { CategoriesTabList } from '../CategoriesTabList';

configure({ adapter: new Adapter() });

describe('components/Categories/CategoriesTabList.js', () => {
  let wrapper;
  let props;
  let tabItems;
  let useEffect;
  beforeEach(() => {
    useEffect = jest.spyOn(fromReact, 'useEffect');
    props = {
      categories: { currentCategory: null, categoriesList: [] },
      loggedIn: false,
      chooseCategory: jest.fn(),
      fetchCategories: jest.fn(),
      history: createBrowserHistory(),
      fetchUserInfo: jest.fn(),
    };
  });

  const update = () => {
    tabItems = wrapper.find(Tab.Item);
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
    useEffect.mockImplementation((f) => f());
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
