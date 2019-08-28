import React from 'react';
import {Background} from './index.jsx';
import { shallow } from 'enzyme';



describe('Background', () => {
  it('It should match the snapshot', () => {

    const wrapper = shallow(<Background />)
    expect(wrapper).toMatchSnapshot();
  })
})