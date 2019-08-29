import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps} from './App';

describe('App', () => {
  let wrapper;
  let props;
  let mockColors
  beforeEach(() => {
     mockColors = ["#000000"];
     props = {
      handleSetProjects: jest.fn(),
      handleProjectSelected: jest.fn()
    }
    wrapper = shallow(<App colors={mockColors} {...props}/>);
  })


it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
});

  it('should return an array of colors', () => {
    const mockState = {
      colors: ["#000000"],
    }
    const expected = {
      colors: ["#000000"],
    }
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  });

});