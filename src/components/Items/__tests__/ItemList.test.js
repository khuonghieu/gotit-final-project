import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ItemList } from '../ItemList';

configure({ adapter: new Adapter() });
