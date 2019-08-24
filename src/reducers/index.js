import { combineReducers } from 'redux';
import { colorsReducer } from './colorsReducer';
import { projectReducer } from './projectReducer';


const rootReducer = combineReducers({
    colors: colorsReducer,
    projects: projectReducer
})

export default rootReducer