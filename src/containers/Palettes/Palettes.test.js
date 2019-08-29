import React from 'react';
import { shallow } from 'enzyme';
import { Palettes } from './index';


describe('Palettes', () => {
  let wrapper;
  let props;
  let palettes
  beforeEach(() => {
     props = {
      projectId: 17,
    }
    palettes = [{name: 'palette'}]
    wrapper = shallow(<Palettes palettes={palettes} {...props}/>);
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should delete a palette', () => {
    let mockPalettes = [ {id: 1, name: 'no'}]
    wrapper.instance().setState({ palettes: mockPalettes })

    wrapper.instance().deletePalette(1)
    
    expect(wrapper.state('palettes')).toEqual([]);
  });
});