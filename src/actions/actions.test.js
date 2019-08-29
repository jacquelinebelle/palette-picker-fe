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

  it('should return a FLIP_SELECT action', () => {
    const result = actions.flipSelect(true);
    const expectedAction = {
      type: 'FLIP_SELECT',
      bool: true
    };
    expect(result).toEqual(expectedAction);
  });

  

});