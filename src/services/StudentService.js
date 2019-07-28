import {fetchStudentsBegin,fetchStudentsSuccess,fetchStudentsError} from '../actions';
import {UserApi} from '../config.js';

export function fetchStudent() {
  return dispatch => { console.log("tt");
    dispatch(fetchStudentsBegin());
    return fetch(UserApi + '/api/Student')
      .then(res => res.json())
      .then(json => {
        dispatch(fetchStudentsSuccess(json));
		console.log("Student",json)
        return json;
      })
      .catch(error => dispatch(fetchStudentsError(error)));
  };
}

export function fetchStudentByCourseID(id) {
  return dispatch => { console.log("tt");
    dispatch(fetchStudentsBegin());
    return fetch(UserApi + '/api/Student/Course/' + id)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchStudentsSuccess(json));
		console.log("Student",json)
        return json;
      })
      .catch(error => dispatch(fetchStudentsError(error)));
  };
}

export function saveStudent(Student) {
  return dispatch => { console.log("tt");
    return fetch(UserApi + '/api/Student', {
		method: 'POST',
		headers: {
		'Accept': 'application/json',
		},
		body: Student
		})
      .then(json => dispatch(fetchStudent()))
      .catch(error => dispatch(fetchStudentsError(error)));
  };
}