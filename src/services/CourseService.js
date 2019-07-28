import {fetchCourseBegin,fetchCourseSuccess,fetchCourseError} from '../actions';
import {AdminApi} from '../config.js';


export function fetchCourses() {
  return dispatch => { 
    dispatch(fetchCourseBegin());
    return fetch(AdminApi + '/api/course')
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCourseSuccess(json));
		console.log("courses",json)
        return json;
      })
      .catch(error => dispatch(fetchCourseError(error)));
  };
}

export function fetchCoursesByStudentId(id) {
  return dispatch => { console.log("tt");
    dispatch(fetchCourseBegin());
    return fetch(AdminApi + '/api/course/student/' + id)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCourseSuccess(json));
		console.log("courses",json)
        return json;
      })
      .catch(error => dispatch(fetchCourseError(error)));
  };
}


export function saveCourse(course) {
  return dispatch => { console.log("tt");
    return fetch(AdminApi + '/api/course', {
		method: 'POST',
		headers: {
		'Accept': 'application/json',
		},
		body: course
		})
      .then(json => dispatch(fetchCourses()))
      .catch(error => dispatch(fetchCourseError(error)));
  };
}

export function removeCourse(id) {
    return dispatch => { console.log("tt");
    return fetch('/api/course/' + id, {
        method: 'DELETE', 
        headers: {
          'Accept': 'application/json',
          }
      }) 
      .then(json => dispatch(fetchCourses()))
      .catch(error => dispatch(fetchCourseError(error)));
    };
  }