import React from 'react';
import { shallow } from 'enzyme';
import { ProjectForm } from './ProjectForm';
// import { openPaletteGenerator } from '../../actions';


describe('ProjectForm', () => {
  let wrapper;

  beforeEach(() => {

    wrapper = shallow(<ProjectForm />);
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set the state as the input changes', () => {
    let event = {target: {name: 'name', value: 'Lis'}}
    let expected = {name: 'Lis',}
    wrapper.instance().handleChange(event)
    expect(wrapper.state()).toEqual(expected)
  })

  it('clearInput', () => {

    expect(wrapper.state().name).toEqual("")

     let event = {target: {name: 'name', value: 'Lis'}}
      wrapper.instance().handleChange(event)

      expect(wrapper.state().name).toEqual("Lis")

      wrapper.instance().clearInput()
      const afterChange = ""
      expect(wrapper.state().name).toEqual(afterChange)
  })

});