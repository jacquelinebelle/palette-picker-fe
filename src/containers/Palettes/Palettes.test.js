import React from 'react';
import { shallow } from 'enzyme';
import { Palettes , mapDispatchToProps, mapStateToProps} from './Palettes';
import { openPaletteGenerator } from '../../actions';


describe('Palettes', () => {
  let wrapper;
  let props;
  let palettes
  beforeEach(() => {
     props = {
      handleOpenPaletteGenerator: jest.fn(),
      openPaletteGen: false,
    }
    palettes = [{name: 'palette'}]
    wrapper = shallow(<Palettes palettes={palettes} {...props}/>);
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('togglePaletteGenerator should call handleOpenPaletteGenerator', async () => {

    await  wrapper.find('.edit-palette-btn').simulate('click', {
      target: {name: 'Update', parentElement: {id: 1}}
    })

    expect(props.handleOpenPaletteGenerator).toHaveBeenCalledTimes(1)
  })

  it.skip('handleDeletePalette should call fetchDeletePalette', async () => {

    wrapper.instance().fetchDeletePalette = jest.fn()

    await  wrapper.find('.delete-palette-btn').simulate('click', {
      target: {id: 2, parentElement: {id: 1}}
    })

    expect(wrapper.instance().fetchDeletePalette()).toHaveBeenCalledTimes(1)
  })

  it('should return selected project', () => {
    const mockState = {
      palettes: [{name: 'palette'}],
    }
    const expected = {
      palettes: [{name: 'palette'}],
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

  it('should return selected project', () => {
    const mockState = {
      openPaletteGen: true,
    }
    const expected = {
      openPaletteGen: true,
    }
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  });

  it('should dispatch with a openPaletteGenerator action when handleOpenPaletteGenerator is called', () => {
    const mockDispatch = jest.fn();
    const mockAction = openPaletteGenerator();
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.handleOpenPaletteGenerator();
    expect(mockDispatch).toHaveBeenCalledWith(mockAction);
  })

});