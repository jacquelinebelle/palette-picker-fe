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
      // submitNewPalette: jest.fn()
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

  it('submitNewPalette should call other functiions', () => {
    const spy = jest.spyOn(wrapper.instance(), "submitNewPalette");
    wrapper.instance().forceUpdate();
    wrapper.find('.add-update-palette-btn').prop('onClick')()
    expect(spy).toHaveBeenCalled();
  });

  it('handleFrozen should should update set state', () => {
    wrapper.instance().handleFrozen = jest.fn();
    wrapper.instance().forceUpdate();
    wrapper.find('.color-1').prop('onClick')()
    expect(wrapper.instance().handleFrozen
    ).toHaveBeenCalled();
  });

  it('handleOnChange should hande change paletteName', () => {
      let event = {target: {name: 'name', value: 'Justin'}}
      wrapper.instance().handleOnChange(event)
      expect(wrapper.state().paletteName).toEqual("Justin")
  })

  it('clearInput should clear paletteName state', () => {
    expect(wrapper.state().paletteName).toEqual(undefined)

      let event = {target: {name: 'name', value: 'Someone'}}
      wrapper.instance().handleOnChange(event)
      expect(wrapper.state().paletteName).toEqual("Someone")

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