import React from 'react';
import { shallow } from 'enzyme';
import { Projects, mapStateToProps } from './Projects';
// import { openPaletteGenerator } from '../../actions';


describe('Projects', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      getPalettes: jest.fn()
    }
    wrapper = shallow(<Projects projects={[{name: 'project'}]} {...props}/>);
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('on click handleGetPalettes should have been called', () => {
      const spy = jest.spyOn(wrapper.instance(), "handleGetPalettes");
      wrapper.instance().forceUpdate();
      wrapper.find('.project-name').simulate('click', {target: {parentElement: { id: 1}}})
      expect(spy).toHaveBeenCalled();
  })

  it.skip('on click handleDeleteProject should have been called', () => {
    // const spy = jest.spyOn(wrapper.instance(), "handleUpdateProject");
    wrapper.instance().handleUpdateProject = jest.fn();
    // wrapper.instance().forceUpdate();
    wrapper.find('.update-project-btn').prop('onClick', { target: {parentElement: { id: 1}}})()
    expect(wrapper.instance().handleUpdateProject).toHaveBeenCalled();
  })

  it('handleChange should set state', () => {
    let event = {target: {name: 'name', value: 'Sam'}}
    wrapper.instance().handleChange(event)
    expect(wrapper.state().defaultName).toEqual("Sam")
  })

  it('handleCancelUpdateProject should set state', () => {

    wrapper.instance().handleCancelUpdateProject()
    expect(wrapper.state().updateProjectOpen).toEqual(false)
  })

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