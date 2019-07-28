import { combineReducers } from 'redux';
import classlist from './classlist.redux';
import header from './header.redux';
import course from './course.redux';
import init from './init.redux';
import classnum from './classnum.redux';
import user from './user.redux';
import indeximg from './indeximg.redux';
import order from './order.redux';
import {studentReducer} from './studentReducer.js';
import {counterReducer} from './counterReducer.js';
import { categoryReducer} from './categoryReducer.js';
import { courseReducer} from './courseReducer.js';
import { imageReducer} from './imageReducer.js';
import {userReducer} from './userReducer.js';
import {orderReducer} from './orderReducer.js';

export default combineReducers({
    classlist,
    header,
    course,
    init,
    classnum,
    user,
    studentReducer,
    counterReducer,
    userReducer,
    categoryReducer,
    courseReducer,
    imageReducer,
    orderReducer,
    indeximg,
    order
});