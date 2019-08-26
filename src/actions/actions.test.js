import * as actions from './index';

describe('Action Creators', () => {
  
  it('should return a SET_GENERATED_COLORS action', () => {
    const mockColors = ['red', 'orange']
    const result = actions.setGeneratedColors(mockColors);
    const expectedAction = {
      type: 'SET_GENERATED_COLORS',
      colors: mockColors
    };
    expect(result).toEqual(expectedAction);
  });

  it('should return all projects action', () => {
    const mockProjects = [{name: 'project 1'}, {name: 'project 2'}]
    const result = actions.setProjects(mockProjects);
    const expectedAction = {
      type: 'SET_PROJECTS',
      projects: mockProjects
    };
    expect(result).toEqual(expectedAction);
  });

  it('should return palettes action', () => {
    const mockPalettes = [{name: 'palette 1'}, {name: 'palette 2'}]
    const result = actions.setPalettes(mockPalettes);
    const expectedAction = {
      type: 'SET_PALETTES',
      palettes: mockPalettes
    };
    expect(result).toEqual(expectedAction);
  });

  it('should return selected project action', () => {
    const selected = 1
    const result = actions.projectSelected(selected);
    const expectedAction = {
      type: 'PROJECT_SELECTED',
      selected: selected
    };
    expect(result).toEqual(expectedAction);
  });

  it('should return openPaletteGenerator action', () => {
    const result = actions.openPaletteGenerator();
    const expectedAction = {
      type: 'OPEN_PALETTE_GENERATOR',
    };
    expect(result).toEqual(expectedAction);
  });

});