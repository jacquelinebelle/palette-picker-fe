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
      openPaletteGen: {open: false},
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

  it('should call generatePalette when btn with generate-btn class is clicked', () => {
    wrapper.instance().generatePalette = jest.fn();
    wrapper.instance().forceUpdate();
    wrapper.find('.generate-btn').prop('onClick')()
    expect(wrapper.instance().generatePalette).toHaveBeenCalled();
  });

  it('generatePalette should update state of color_1', () => {
    const color =  wrapper.state().color_1
    expect(wrapper.state().color_1).toEqual(color)
    wrapper.instance().forceUpdate();

    let event = {target: {id: 0}}
    wrapper.instance().handleFrozen(event)

    wrapper.find('.generate-btn').prop('onClick')()
    expect(wrapper.state().color_1).toEqual(color)
  });

  it('generatePalette should update state of color_2', () => {
    const color =  wrapper.state().color_2
    expect(wrapper.state().color_2).toEqual(color)
    wrapper.instance().forceUpdate();

    let event = {target: {id: 1}}
    wrapper.instance().handleFrozen(event)

    wrapper.find('.generate-btn').prop('onClick')()
    expect(wrapper.state().color_2).toEqual(color)
  });

  it('generatePalette should update state of color_3', () => {
    const color =  wrapper.state().color_3
    expect(wrapper.state().color_3).toEqual(color)
    wrapper.instance().forceUpdate();

    let event = {target: {id: 2}}
    wrapper.instance().handleFrozen(event)

    wrapper.find('.generate-btn').prop('onClick')()
    expect(wrapper.state().color_3).toEqual(color)
  });

  it('generatePalette should update state of color_4', () => {
    const color =  wrapper.state().color_4
    expect(wrapper.state().color_4).toEqual(color)
    wrapper.instance().forceUpdate();

    let event = {target: {id: 3}}
    wrapper.instance().handleFrozen(event)

    wrapper.find('.generate-btn').prop('onClick')()
    expect(wrapper.state().color_4).toEqual(color)
  });

  it('generatePalette should update state of color_5', () => {
    const color =  wrapper.state().color_5
    expect(wrapper.state().color_5).toEqual(color)
    wrapper.instance().forceUpdate();

    let event = {target: {id: 4}}
    wrapper.instance().handleFrozen(event)

    wrapper.find('.generate-btn').prop('onClick')()
    expect(wrapper.state().color_5).toEqual(color)
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

  it('submitNewPalette should call other functiions', () => {

    let event = {target: {name: 'name', value: 'James'}}
      wrapper.instance().handleOnChange(event)
 
    wrapper.instance().clearInput = jest.fn()
    wrapper.instance().forceUpdate();
    wrapper.find('.add-update-palette-btn').prop('onClick')()
    expect(props.addAndUpdatePalette).toHaveBeenCalled();
    expect(wrapper.instance().clearInput).toHaveBeenCalled();
    expect(wrapper.state().frozen).toEqual(['Lock', 'Lock', 'Lock', 'Lock', 'Lock'])
  });

  it('handleFrozen have been called with click', () => {
    wrapper.instance().handleFrozen = jest.fn();
    wrapper.instance().forceUpdate();
    wrapper.find('.color-1').prop('onClick')()
    expect(wrapper.instance().handleFrozen
    ).toHaveBeenCalled();
  });

  it('handleFrozen should should update set state from Lock to Locked', () => {

    expect(wrapper.state().frozen).toEqual(["Lock", "Lock", "Lock", "Lock", "Lock"])
    let event = {target: {id: 1}}
    wrapper.instance().handleFrozen(event)
    expect(wrapper.state().frozen).toEqual(["Lock", "Locked", "Lock", "Lock", "Lock"])
  });

  it('handleFrozen should should update set state from Locked to Lock', () => {
    let event = {target: {id: 1}}
    wrapper.instance().handleFrozen(event)

    expect(wrapper.state().frozen).toEqual(["Lock", "Locked", "Lock", "Lock", "Lock"])

    wrapper.instance().handleFrozen(event)
    expect(wrapper.state().frozen).toEqual(["Lock", "Lock", "Lock", "Lock", "Lock"])
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