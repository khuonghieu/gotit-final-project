import React, * as fromReact from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reactRouter from 'react-router';
import { ItemList } from '../index';

configure({ adapter: new Adapter() });

describe('components/Items/ItemList.js', () => {
  let wrapper;
  let props;
  let useEffect;
  let useLocation;
  let useHistory;
  let useState;
  const history = {
    push: jest.fn(),
  };
  const location = {
    search: '',
  };

  beforeEach(() => {
    useEffect = jest.spyOn(fromReact, 'useEffect');
    useLocation = jest.spyOn(reactRouter, 'useLocation');
    useHistory = jest.spyOn(reactRouter, 'useHistory');
    useState = jest.spyOn(fromReact, 'useState');
    props = {
      editComplete: false,
      currentCategory: '1',
      viewItems: jest.fn(),
      user: { loggedIn: true },
    };
  });

  const setup = () => {
    wrapper = shallow(
      <ItemList {...props} />,
    );
  };

  it('should render correctly', () => {
    useLocation.mockImplementation(() => location);
    useHistory.mockImplementation(() => history);
    props.viewItems.mockReturnValue({ success: true, payload: [1, 2, 3] });
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call viewItem API if currentCategory exists', () => {
    const location = { search: '?page=1' };
    useEffect.mockImplementation((f) => f());
    useHistory.mockImplementation(() => history);
    useLocation.mockImplementation(() => location);
    props.viewItems.mockReturnValue({ success: true, payload: [1, 2, 3] });
    setup();
    expect(props.viewItems).toHaveBeenCalled();
  });

  it('should set item list when fetching items successfully', async () => {
    const setState = jest.fn();
    const location = { search: '?page=1' };
    useState.mockImplementation((itemList) => [itemList, setState]);
    useEffect.mockImplementation((f) => f());
    useLocation.mockImplementation(() => location);
    props.viewItems.mockReturnValue({ success: true, payload: [1, 2, 3] });
    await setup();
    expect(setState).toHaveBeenCalled();
  });
});
