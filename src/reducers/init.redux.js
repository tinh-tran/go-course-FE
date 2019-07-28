import { combineReducers } from 'redux';
import hotclass from './init/hotclass.redux';
import classtype from './init/classtype.redux';

export default combineReducers({
    hotclass,
    classtype
});