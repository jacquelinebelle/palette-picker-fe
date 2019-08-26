import { setGeneratedColors, setProjects, openPaletteGenerator, projectSelected, setPalettes } from '../actions';
import { colorsReducer } from './colorsReducer';
import { projectsReducer } from './projectsReducer';
import { openPaletteGeneratorReducer } from './openPaletteGeneratorReducer';
import { palettesReducer } from './palettesReducer';
import { projectSelectedReducer } from './projectSelectedReducer';

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


  describe('openPaletteGeneratorReducer', () => {
    it('should return state as default', () => {
      const result = openPaletteGeneratorReducer(undefined, []);
      expect(result).toEqual(false);
    });

    it('should toggle openPaletteGen', () => {
      const action = openPaletteGenerator();
      const result = openPaletteGeneratorReducer(false, action);
      const expected = true
      expect(result).toEqual(expected);
    });
  });

  describe('palettesReducer', () => {
    it('should return state as default', () => {
      const result = palettesReducer(undefined, []);
      expect(result).toEqual([]);
    });

    it('should return one palette', () => {
      const mockPalettes = [{ame: 'palette'}]
      const action = setPalettes(mockPalettes);
      const result = palettesReducer(undefined, action);
      const expected = [{ame: 'palette'}]
      expect(result).toEqual(expected);
    });
  });

  describe('projectSelectedReducer', () => {
    it('should return state as default', () => {
      const result = projectSelectedReducer(undefined, []);
      expect(result).toEqual(0);
    });

    it('should return an the id of selected project', () => {

      const action = projectSelected(2);
      const result = projectSelectedReducer(undefined, action);
      const expected = 2
      expect(result).toEqual(expected);
    });

  });



  describe('projectsReducer', () => {
    it('should return state as default', () => {
      const result = projectsReducer(undefined, []);
      expect(result).toEqual([]);
    });

    it('should return an array of projects that includes the one you added', () => {
      const mockProjects = [{id: 1, name: 'junior', palettes: []}]

      const action = setProjects(mockProjects);
      const result = projectsReducer(mockProjects, action);
      const expected = [{id: 1, name: 'junior', palettes: []}]
      expect(result).toEqual(expected);
    });

  });


})