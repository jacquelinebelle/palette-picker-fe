import React from 'react';
import {PaletteGenerator, mapDispatchToProps, mapStateToProps} from './index';
import { shallow } from 'enzyme';
import { setGeneratedColors } from '../../actions';

describe('PaletteGenerator', () => {
  let wrapper;
  let props;
  // let mockColors
  beforeEach(() => {
    //  mockColors = ["#000000"];
     props = {
      setGeneratedColors: jest.fn()
      
    }
  wrapper = shallow(<PaletteGenerator {...props}/>);
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call generatePalette when component mounts', () => {
    wrapper.instance().generatePalette = jest.fn();
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().generatePalette).toHaveBeenCalled()
  });

  it('should change state based on a particular palette when getSpecifiedPalette is called', () => {
    let mockPalette = {
      id: 1,
      name: 'aquafina',
      color_1: 'pink'
    }

    wrapper.instance().getSpecifiedPalette(mockPalette);

    expect(wrapper.state('name')).toEqual('aquafina');
  });

  it('should change state to whatever is typed in a name input', () => {
    wrapper.instance().setState({ specified: true })
    
    wrapper.find('.false-pal-input').simulate('change', {
      target: { value: 'buh' }
    })

    expect(wrapper.state('name')).toEqual('buh');
  });

  it('should lock a color', () => {
    wrapper.instance().setState({ color_1: 'pink' })
    
    wrapper.find('.color-1').children().simulate('click', {
      target: { num: 1 }
    })

    expect(wrapper.state('color_1')).toEqual('locked-pink');
  });

  it.skip('should call fetchPatchPalette when updatePalette is called', () => {
    wrapper.instance().setState({ name: 'pink' })
    wrapper.instance().fetchPatchPalette = jest.fn();

    wrapper.instance().updatePalette({ keyCode: 13 }, 1)

    expect(wrapper.instance().fetchPatchPalette).toHaveBeenCalled();
  });

  it('should update input on click', () => {
    wrapper.instance().setState({ specified: true, input: false })
    
    wrapper.find('.true-pal-name').simulate('click')

    expect(wrapper.state('input')).toEqual(true);
  });

  it.skip('should call generatePalette when generate-btn button is clicked', () => {
    wrapper.instance().generatePalette = jest.fn();
    wrapper.find('.generate-btn').simulate('click')
    expect(wrapper.instance().generatePalette).toHaveBeenCalled();
  });


  it('should return a boolean', () => {
    const mockState = {"select": true}
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(mockState)
  });


  it('should dispatch with a setGeneratedColors action when handleSetGeneratedColors is called', async () => {
    const mockDispatch = jest.fn();
    const mockColors = ["#000000"];
    const mockAction = setGeneratedColors(mockColors);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.setGeneratedColors(mockColors);
    expect(mockDispatch).toHaveBeenCalledWith(mockAction);
  })
  
})