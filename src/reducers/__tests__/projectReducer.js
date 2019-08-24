import { addProject, savePalette } from '../../actions/index'
import { projectReducer } from '../projectReducer';

describe('projectReducer', () => {
  it('should return state as default', () => {
    const result = projectReducer(undefined, []);
    expect(result).toEqual([]);
  });

  it('should return an array of projects that includes the one you added', () => {
    const mockName = 'shoes';
    const mockProjects = [{id: 1, name: 'junior', palettes: []}]

    const action = addProject(mockName);
    const result = projectReducer(mockProjects, action);
    const expected = [{id: 1, name: 'junior', palettes: []}, {id: 2, name: 'shoes', palettes: []}]

    expect(result).toEqual(expected);
  });

  it('should add a palette to a specific project\'s palette array', () => {
    const projectId = 45;
    const paletteId = 2;
    const mockState = [
        {id: 1, name: 'pear', palettes: []},
        {id: 45, name: 'turtle', palettes: []}
    ]

    const action = savePalette(projectId, paletteId);
    const result = projectReducer(mockState, action);
    const expected = [
        {id: 1, name: 'pear', palettes: []},
        {id: 45, name: 'turtle', palettes: [paletteId]}
    ]
    
    expect(result).toEqual(expected);
  });
});