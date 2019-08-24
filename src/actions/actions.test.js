import * as actions from './index';

describe('action creators', () => {
  it('should return a SET_GENERATED_COLORS action', () => {
    const mockColors = ['red', 'orange']
    const result = actions.setGeneratedColors(mockColors);
    const expected = {
      type: 'SET_GENERATED_COLORS',
      colors: mockColors
    };
    expect(result).toEqual(expected);
  });

  it('should return a ADD_PROJECT action', () => {
    const mockName = 'grandma'
    const result = actions.addProject(mockName);
    const expected = {
      type: 'ADD_PROJECT',
      name: mockName
    };
    expect(result).toEqual(expected);
  });

  it('should return a SAVE_PALETTE action', () => {
    const mockProjectId = 1
    const mockPaletteId = 3
    const result = actions.savePalette(mockProjectId, mockPaletteId);
    const expected = {
      type: 'SAVE_PALETTE',
      project_id: mockProjectId,
      palette_id: mockPaletteId
    };
    expect(result).toEqual(expected);
  });

});