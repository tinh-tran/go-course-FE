import { combineReducers } from 'redux';
import classlist from './classlist.redux';
import header from './header.redux';
import init from './init.redux';


export default combineReducers({
    classlist,
    header,
    init
});