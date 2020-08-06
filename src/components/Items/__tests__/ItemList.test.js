import React, * as fromReact from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ItemList } from '../ItemList';

configure({ adapter: new Adapter() });

describe('components/Items/ItemList.js', () => {
  let wrapper;
  let props;
  let useEffect;

  beforeEach(() => {
    useEffect = jest.spyOn(fromReact, 'useEffect');
    props = {
      editComplete: false,
      currentCategory: 1,
      viewItems: jest.fn(),
    };
  });

  const setup = () => {
    wrapper = shallow(
      <ItemList {...props} />,
    );
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call viewItem API when mounted if currentCategory exists', () => {
    useEffect.mockImplementation((f) => f());
    setup();
    expect(props.viewItems).toHaveBeenCalled();
  });
});
