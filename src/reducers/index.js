import { combineReducers } from 'redux';
import { colorsReducer } from './colorsReducer';
import { projectsReducer } from './projectsReducer';


const rootReducer = combineReducers({
    colors: colorsReducer,
    projects: projectsReducer
})

export default rootReducer