import { combineReducers } from 'redux';
import { colorsReducer } from './colorsReducer';
import { projectsReducer } from './projectsReducer';
import { palettesReducer } from './palettesReducer';
import { projectSelectedReducer } from './projectSelectedReducer';
import { openPaletteGeneratorReducer } from './openPaletteGeneratorReducer';


const rootReducer = combineReducers({
    colors: colorsReducer,
    projects: projectsReducer,
    palettes: palettesReducer,
    selectedProject: projectSelectedReducer,
    openPaletteGen: openPaletteGeneratorReducer
})

export default rootReducer