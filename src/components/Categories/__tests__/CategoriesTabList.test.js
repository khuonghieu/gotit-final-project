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
  let useHistory;
  let useParams;

  beforeEach(() => {
    useEffect = jest.spyOn(fromReact, 'useEffect');
    useParams = jest.spyOn(reactRouter, 'useParams');
    useHistory = jest.spyOn(reactRouter, 'useHistory');

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
    const history = {
      push: jest.fn(),
    };
    const params = {
      categoryId: 1,
      match: jest.fn(),
    };
    useHistory.mockImplementation(() => history);
    useParams.mockImplementation(() => params);
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetchCategories when rendered', () => {
    useEffect.mockImplementation((f) => f());
    const history = {
      push: jest.fn(),
    };
    const params = {
      categoryId: 1,
      match: jest.fn(),
    };
    useHistory.mockImplementation(() => history);
    useParams.mockImplementation(() => params);
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

  it('should call chooseCategory with params.categoryId if it exists', async () => {
    useEffect.mockImplementation((f) => f());
    const history = {
      push: jest.fn(),
    };
    const params = {
      categoryId: 1,
      match: jest.fn(),
    };
    useHistory.mockImplementation(() => history);
    useParams.mockImplementation(() => params);
    await setup();
    expect(props.chooseCategory).toHaveBeenCalledWith(1);
  });

  it('should call chooseCategory with first categoryId when param does not have categoryId and category list has 1 or more elements', async () => {
    useEffect.mockImplementation((f) => f());
    const history = {
      push: jest.fn(),
    };
    const params = {
      categoryId: null,
      match: jest.fn(),
    };
    useHistory.mockImplementation(() => history);
    useParams.mockImplementation(() => params);
    props.fetchCategories.mockReturnValue({ payload: { categories: [{ id: 1, name: 'sport' }, { id: 2, name: 'fashion' }] } });
    await setup();
    expect(props.chooseCategory).toHaveBeenCalledWith(1);
  });

  it('should call chooseCategory with null when param does not have categoryId and category list has 0 element', async () => {
    useEffect.mockImplementation((f) => f());
    const history = {
      push: jest.fn(),
    };
    const params = {
      categoryId: null,
      match: jest.fn(),
    };
    useHistory.mockImplementation(() => history);
    useParams.mockImplementation(() => params);
    props.fetchCategories.mockReturnValue({ payload: { categories: [] } });
    await setup();
    expect(props.chooseCategory).toHaveBeenCalledWith(null);
  });
});
