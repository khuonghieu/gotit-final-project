import React, * as fromReact from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reactRouter from 'react-router';
import { ItemDetails } from '../ItemDetails';

configure({ adapter: new Adapter() });

describe('components/Items/ItemDetails.js', () => {
  let wrapper;
  let props;
  let useEffect;
  let useParams;

  beforeEach(() => {
    useEffect = jest.spyOn(fromReact, 'useEffect');
    useParams = jest.spyOn(reactRouter, 'useParams');
    props = {
      chooseItem: jest.fn(),
    };
  });

  const setup = () => {
    wrapper = shallow(
      <ItemDetails {...props} />,
    );
  };

  it('should render correctly', () => {
    const params = {
      categoryId: 1,
      itemId: 1,
      match: jest.fn(),
    };
    useParams.mockImplementation(() => params);
    setup();
    expect(wrapper).toMatchSnapshot();
  });
});
