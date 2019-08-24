import { setGeneratedColors } from '../../actions/index'
import { colorsReducer } from '../colorsReducer';

describe('colorsReducer', () => {
  it('should return state as default', () => {
    const result = colorsReducer(undefined, []);
    expect(result).toEqual([]);
  });

  it('should return an array of colors', () => {
    const mockColors = ['red', 'purple']
    const action = setGeneratedColors(mockColors);
    const result = colorsReducer(undefined, action);
    expect(result).toEqual(mockColors);
  });
});