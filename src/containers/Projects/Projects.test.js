import React from 'react';
import { shallow } from 'enzyme';
import { Projects, mapStateToProps } from './Projects';
// import { openPaletteGenerator } from '../../actions';


describe('ProjectForm', () => {
  let wrapper;

  beforeEach(() => {

    wrapper = shallow(<Projects projects={[{name: 'project'}]}/>);
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should return selected project', () => {
    const mockState = {
      projects: [{name: 'project'}],
    }
    const expected = {
      projects: [{name: 'project'}],
    }
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  });

  it('should return selected project', () => {
    const mockState = {
      selectedProject: 1,
    }
    const expected = {
      selectedProject: 1,
    }
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  });

});