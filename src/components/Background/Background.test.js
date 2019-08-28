import React from 'react';
import { shallow } from 'enzyme';
import { Background } from './index';

describe('Background', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow( <Background color_1={'#FFFFFF'} color_2={'#FFFFFF'} color_3={'#FFFFFF'} color_4={'#FFFFFF'} color_5={'#FFFFFF'} /> )
  });

  it('should match the snapshot with all the data passed in', () => {
    expect(wrapper).toMatchSnapshot()
  })
})