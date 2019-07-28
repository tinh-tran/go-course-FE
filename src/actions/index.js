import * as actionType from './ActionType';
import axios from 'axios';
import { message } from 'antd';
import {UserApi} from '../config'

export const GET_MYCLASS = (userid) => {
    return dispatch => {
        axios.post('/api/course/createid', userid).then(
            res => {
                dispatch({ type: 'GET_MYCLASS', myclass: res.data })
            }
        )
    }
}
export const fetchStudentsBegin = () => ({
  type: actionType.FETCH_STUDENTS_BEGIN
});

export const fetchStudentsSuccess = students => ({
  type: actionType.FETCH_STUDENTS_SUCCESS,
  payload: { students }
});

export const fetchStudentsError = error => ({
  type: actionType.FETCH_STUDENTS_FAILURE,
  payload: { error }
});

export const addCounter = () => ({
  type: actionType.ADD_COUNTER,
  payload: 1
});

export const removeCounter = () => ({
  type: actionType.REMOVE_COUNTER,
  payload: 1
});

export const loginSuccess = () => ({
  type: actionType.LOG_IN_SUCCESS,
});

export const logOut = () => ({
  type: actionType.LOG_OUT,
});

export const fetchCategoriesBegin = () => ({
  type: actionType.FETCH_CATEGORY_BEGIN
});

export const fetchCategoriesSuccess = categories => ({
  type: actionType.FETCH_CATEGORY_SUCCESS,
  payload: { categories }
});

export const fetchCategoriesError = error => ({
  type: actionType.FETCH_CATEGORY_FAILURE,
  payload: { error }
});

export const fetchCourseBegin = () => ({
  type: actionType.FETCH_COURSE_BEGIN
});

export const fetchCourseSuccess = courses => ({
  type: actionType.FETCH_COURSE_SUCCESS,
  payload: { courses }
});

export const fetchCourseError = error => ({
  type: actionType.FETCH_COURSE_FAILURE,
  payload: { error }
});

export const uploadImageBegin = () => ({
  type: actionType.UPLOAD_IMAGE_BEGIN
});

export const uploadImageSuccess = image => ({
  type: actionType.UPLOAD_IMAGE_SUCCESS,
  payload: { image }
});

export const uploadImageError = error => ({
  type: actionType.UPLOAD_IMAGE_FAILURE,
  payload: { error }
});

export const fetchOrderBegin = () => ({
  type: actionType.FETCH_ORDER_BEGIN
});

export const fetchOrderSuccess = order => ({
  type: actionType.FETCH_ORDER_SUCCESS,
  payload: { order }
});

export const fetchOrderError = error => ({
  type: actionType.FETCH_ORDER_FAILURE,
  payload: { error }
});



const config = {
    headers: {
      'Content-Type': 'application/json',
//      'Content-Type': 'multipart/form-data',
      'Content-Type': 'application/x-www-form-urlencoded'
    }  
}


export const ChangeUserInfo = (userInfo) => {
    return dispatch => {
        axios.post('/api/User/updateinfo', userInfo).then(
            res => {
                if (res.data.code === 0) {
                    message.error('Input UserName Or Password Error', 0.5);
                } else {
                    message.success('Success', 0.5);
                    dispatch({ type: 'LOAD_DISPLAYNAME', displayname: res.data.displayname })
                }
            }
        )
    }
}

export const ChangeHeader = (clicked) => {
  return { type: "CHANGE_HEADER", currect: clicked }
}

export const RestartUser = (userid) => {
    return dispatch => {
        axios.post('/api/user/info/id', { userid }).then(
            res => {
                dispatch({ type: 'RESTART_USER', userphoto: res.data })
            }
        )
    }
}


export const SearchItem = (item) => {
    return dispatch => {
        axios.post('/api/search', { item }).then(
            res => {
                dispatch({ type: 'SEARCH_ITEM', item: item, answer: res.data })
            }
        )
    }
  }

export const IsSelect = (CustomerId, CourseId) => {
    return dispatch => {
        axios.post('/api/order/byuserid', { CustomerId, CourseId }, config).then(
            res => {
                let obj = res.data[0];
                if ( res.data.length == 0) {
                   
                    dispatch({ type: 'IS_SELECT', CustomerId: CustomerId, CourseId: CourseId, isSelect: false, orderInfo: res.data, Status: 0})
                }
                else {
                    dispatch({ type: 'IS_SELECT', CustomerId: CustomerId, CourseId: CourseId, isSelect: true, orderInfo: res.data, Status: obj.Status})
                }
                
            }
        )
    }
  }

export const LoadCourse = (CourseId) => {
    return dispatch => {
        axios.post('/api/course/byid', {'CourseId':CourseId} , config).then(
            res => {
                dispatch({ type: 'LOAD_COURSE', classinfo: res.data })
            }
        )
    }
}

export const LoadCart = (CustomerId) => {
    return dispatch => {
        axios.post('/api/order/getcartbyid', { CustomerId } , config).then(
            res => {
                dispatch({ type: 'LOAD_CART', shoppingcart: res.data })
            }
        )
    }
}

export const LoadChapter = (CourseId) => {
    return dispatch => {
        axios.post('/api/course/chapter/byid', {'CourseId':CourseId} , config).then(
            res => {
                dispatch({ type: 'LOAD_CHAPTER', classchapter: res.data })
            }
        )
    }
}
export const LoadSection = (CourseId) => {
    return dispatch => {
        axios.post('/api/course/section/byid', {'CourseId':CourseId} , config).then(
            res => {
                dispatch({ type: 'LOAD_SECTION', classsection: res.data })
            }
        )
    }
}

export const SelectCourse = (OrderId, CourseID, CustomerId, Status) => {
    return dispatch => {
        axios.post('/api/order', {OrderId, CourseID, CustomerId, Status }, config).then(
            res => {
                if (res.data.code === 0) {
                    message.error('Error', 1);
                } else { 
                    if (!CustomerId){
                        message.error('Login Please', 1);
                    }else if (Status === 1) {
                        message.success('Success', 1);
                        dispatch({ type: 'SELECT_COURSE', isSelect: true });
                    }else if (Status === 2) { 
                        dispatch({ type: 'SELECT_COURSE', isSelect: false, Status : Status });
                    }
                    
                }
            }
        )
    }
}
export const RemoveCart = (CustomerId,OrderId, Status) => {
    return dispatch => {
        axios.post('/api/order/update', {CustomerId, OrderId, Status}, config).then(
            res => {
                if (res.data.code === 0) {
                    message.error('Error', 1);
                } else { 
                    if (Status === 0) {
                        message.success('RemoveCart', 1);
                        dispatch({ type: 'REMOVE_CART', shoppingcart: res.data});
                    }
                    
                }
            }
        )
    }
}

export const LoadPicture = () => {
  return dispatch => {
      axios.get('/api/course').then(
          res => {
              dispatch({ type: 'LOAD_IMG', img: res.data })
          }
      )
  }
}

export const GetClassNum = (CategoryID) => {
    return dispatch => {
        axios.post('/api/course/number', { CategoryID } , config).then(
            res => {
                let obj = res.data[0];
                return dispatch({ type: 'LOAD_CLASSNUM', classnum: obj.Num, CategoryID: CategoryID })
            }
        )
    }
}

export const LoadClass = (info) => {
    return dispatch => {
        axios.post('/api/course/bycat', { ...info }, config).then(
            res => {
                dispatch({ type: 'LOAD_CLASS', classdata: res.data, Page: info.Page })
            }
        )
    }
}

export const LoadClassType = () => {
    return dispatch => {
        axios.get('/api/category').then(
            res => {
                dispatch({ type: 'LOAD_CLASSTYPE', classtype: res.data })
            }
        )
    }
}

export const LoadHotClass = () => {
    return dispatch => {
        axios.get('/api/course').then(
            res => {
                dispatch({ type: "LOAD_HOTCLASS", hotclass: res.data })
            }

        )
    }
}

export const Login = (userInfo) => {
    return dispatch => {
        axios.post(UserApi+'/api/User/login', { ...userInfo }, config).then(
            res => {
                if (res.data.code === 0) {
                    dispatch({ type: 'LOGIN_FAILD' })
                } else {
                    dispatch({ type: 'INITIAL_USER', info: res.data })
                }
            }
        )
    }
}

export const Register = (userInfo) => {
    return dispatch => {
        axios.post(UserApi+'/api/User/register', { ...userInfo }, config).then(
            res => {
                if (res.data.code === 0) {
                    dispatch({ type: 'REGISTER_FAILD' })
                } else {
                    message.success('Register Success' + userInfo.UserName, 1);
                    dispatch({ type: 'REGISTER_SUCCESS', UserName : userInfo.UserName })
                }
            }
        )
    }
}

