import React from 'react';
import { shallow, mount } from 'enzyme';
import { ProjectForm } from './index';

describe('ProjectForm', () => {
  let wrapper, mockProjects, props;

  beforeEach(() => {
    mockProjects = [{name: 'best'}]
    props = { flipSelect: false }
    wrapper = shallow(<ProjectForm {...props} />)
    wrapper.instance().setState({ projects: mockProjects })
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should change state to whatever is typed in a name input', () => {
    wrapper.instance().setState({ projects: false, name: '', nameError: false })

    wrapper.find('.project-input').simulate('change', {
      target: { value: 'buh' }
    })

    expect(wrapper.state('name')).toEqual('buh');
  });

  it('should set nameError to true if not unique name', () => {
    const name = 'best';
    wrapper.instance().checkName(name);

    expect(wrapper.state('nameError')).toEqual(true);

  })

  it('should set select to false when savePalette', () => {
    wrapper.instance().setState({ select: true });

    wrapper.instance().savePalette();

    expect(wrapper.state('select')).toEqual(false);

  })

  it.skip('clearInput', () => {
    expect(wrapper.state().name).toEqual("Lis")
      wrapper.instance().clearInput()
      expect(wrapper.state().name).toEqual("")
  })

});