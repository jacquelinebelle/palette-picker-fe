import { setGeneratedColors, flipSelect } from '../actions';
import { colorsReducer } from './colorsReducer';
import { flip } from './flipReducer';

describe('Reducers', () => {

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


  describe('flipReducer', () => {
    it('should return state as default', () => {
      const result = flip(undefined, false);
      expect(result).toEqual(false);
    });

    it('should sometimes be true', () => {
      const action = flipSelect(true);
      const result = flip(undefined, action);
      const expected = true
      expect(result).toEqual(expected);
    });
  });

})