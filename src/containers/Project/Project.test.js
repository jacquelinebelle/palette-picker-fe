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
  });

  it('should change state to whatever is typed in a name input', () => {
    wrapper.instance().setState({ input: true })
    
    wrapper.find('.true-input').simulate('change', {
      target: { value: 'buh' }
    })

    expect(wrapper.state('name')).toEqual('buh');
  });

  it('should switch input state to false', () => {
    wrapper.instance().setState({ input: true })
    
    wrapper.instance().updateProjectName({ keyCode: 13 }, 12)

    expect(wrapper.state('input')).toEqual(false);
  });

  it('should switch input state to true', () => {
    wrapper.instance().setState({ input: false })
    
    wrapper.find('.single-proj-name').simulate('click');

    expect(wrapper.state('input')).toEqual(true);
  });
})