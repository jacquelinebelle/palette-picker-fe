import { combineReducers } from 'redux';
import { colorsReducer } from './colorsReducer';
import { projectsReducer } from './projectsReducer';
import { palettesReducer } from './palettesReducer';


const rootReducer = combineReducers({
    colors: colorsReducer,
    projects: projectsReducer,
    palettes: palettesReducer,
})

export default rootReducer