import React from 'react';
import {PaletteGenerator, mapDispatchToProps, mapStateToProps} from './PaletteGenerator';
import { shallow } from 'enzyme';
import { setGeneratedColors, openPaletteGenerator } from '../../actions';

describe('PaletteGenerator', () => {
  let wrapper;
  let props;
  // let mockColors
  beforeEach(() => {
    //  mockColors = ["#000000"];
     props = {
      handleSetGeneratedColors: jest.fn(),
      handleOpenPaletteGenerator: jest.fn(),
      addAndUpdatePalette: jest.fn(),
      openPaletteGen: false,
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

  it.skip('should call generatePalette when btn with generate-btn class is clicked', () => {
    wrapper.instance().generatePalette = jest.fn();
    wrapper.find('.generate-btn').prop('onClick')()
    expect(wrapper.instance().generatePalette).toHaveBeenCalled();
  });

  it('togglePaletteGenerator should call handleOpenPaletteGenerator', () => {
    wrapper.instance().togglePaletteGenerator();
    expect(props.handleOpenPaletteGenerator).toHaveBeenCalledTimes(1)
  });

  it.skip('submitNewPalette should call other functiions', () => {
    wrapper.instance().submitNewPalette = jest.fn();
    wrapper.find('.add-palette-btn').prop('onClick')()
    expect(wrapper.instance().submitNewPalette).toHaveBeenCalled();
  });

  it.skip('clearInput', () => {
    expect(wrapper.state().paletteName).toEqual("Lis")
      wrapper.instance().clearInput()
      expect(wrapper.state().paletteName).toEqual("")
  })

  it('should return selected project', () => {
    const mockState = {
      openPaletteGen: false,
    }
    const expected = {
      openPaletteGen: false,
    }
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  });

  it('should dispatch with a setGeneratedColors action when handleSetGeneratedColors is called', async () => {
    const mockDispatch = jest.fn();
    const mockColors = ["#000000"];
    const mockAction = setGeneratedColors(mockColors);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.handleSetGeneratedColors(mockColors);
    expect(mockDispatch).toHaveBeenCalledWith(mockAction);
  })

  it('should dispatch with a openPaletteGenerator action when handleOpenPaletteGenerator is called', async () => {
    const mockDispatch = jest.fn();
    const mockAction = openPaletteGenerator();
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.handleOpenPaletteGenerator();
    expect(mockDispatch).toHaveBeenCalledWith(mockAction);
  })
  
})