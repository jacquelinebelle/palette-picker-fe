import { combineReducers } from 'redux';
import { colorsReducer } from './colorsReducer';

const rootReducer = combineReducers({
    colors: colorsReducer
})

export default rootReducer