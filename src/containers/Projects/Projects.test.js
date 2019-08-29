import React from 'react';
import { shallow } from 'enzyme';
import { Projects } from './index';


describe('ProjectForm', () => {
  let wrapper, projects;

  beforeEach(() => {
    projects = [{id: 1, name: 'good'}]

    wrapper = shallow(<Projects />);
    wrapper.instance().setState({ projects: projects })
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });


  it('should delete a project', () => {
    wrapper.instance().deleteProject(1)
    
    expect(wrapper.state('projects')).toEqual([]);
  });

  

});