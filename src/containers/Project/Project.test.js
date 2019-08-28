import React from 'react';
import { shallow } from 'enzyme';
import { Project } from './index';

describe('Project', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow( <Project /> )
  });

  it('should match the snapshot with all the data passed in', () => {
    expect(wrapper).toMatchSnapshot()
  })
})