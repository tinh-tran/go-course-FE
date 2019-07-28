import {fetchOrderBegin,fetchOrderSuccess,fetchOrderError} from '../actions';
import {CourseApi} from '../config.js';

const axios = require("axios");

export function orderCourse(order,CourseId,studentID) {
		
		if(order.CourseId){
			if(order.Status<3)
				order.Status = order.Status + 1
		}
		else {
			order.CourseId = CourseId
			order.Status = 1
			order.StudentID = parseInt(studentID) 
		}
	return dispatch => { console.log("tt");
    return fetch(CourseApi + '/api/order', {
		method: 'POST',
		headers: {
		'Accept': 'application/json',
		},
		body: JSON.stringify(order)
		})
      .then(json => dispatch(fetchOders(order.CourseId,studentID)))
      .catch(error => dispatch(fetchOrderError(error)));
  };
}

export function fetchOders(courseId,studentID) {
	console.log(studentID)
  return dispatch => { console.log("tt");
    dispatch(fetchOrderBegin());
    return fetch(CourseApi + '/api/order/'+studentID+'/'+ courseId )
      .then(res => res.json())
      .then(json => {
        dispatch(fetchOrderSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchOrderError(error)));
  };
}