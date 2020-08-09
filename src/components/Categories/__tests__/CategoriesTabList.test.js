import React, * as fromReact from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Tab } from '@gotitinc/design-system';
import reactRouter from 'react-router';
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
      chooseCategory: jest.fn(),
      fetchCategories: jest.fn(),
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

  it('should call fetchCategories when rendered', () => {
    useEffect.mockImplementation((f) => f());
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
