import { combineReducers } from 'redux';
import { colorsReducer } from './colorsReducer';
import { flip } from './flipReducer';

const rootReducer = combineReducers({
    colors: colorsReducer,
    select: flip
})

export default rootReducer