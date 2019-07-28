import {fetchCategoriesBegin,fetchCategoriesSuccess,fetchCategoriesError} from '../actions';
import {AdminApi} from '../config.js';

export function fetchCategories() {
  return dispatch => { console.log("tt");
    dispatch(fetchCategoriesBegin());
    return fetch(AdminApi + '/api/category')
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCategoriesSuccess(json));
		console.log("Categories",json)
        return json;
      })
      .catch(error => dispatch(fetchCategoriesError(error)));
  };
}
export function saveCategory(category) {
  return dispatch => { console.log(category);
    return fetch(AdminApi + '/api/category', {
		method: 'POST',
		headers: {
		'Accept': 'application/json',
		},
		body: category
		})
      .then(json => dispatch(fetchCategories()))
      .catch(error => dispatch(fetchCategoriesError(error)));
  };
}

export function removeCategory(id) {
  return dispatch => { console.log("tt");
  return fetch('/api/category/' + id, {
      method: 'DELETE', 
      headers: {
		'Accept': 'application/json',
		}
    }) 
    .then(json => dispatch(fetchCategories()))
    .catch(error => dispatch(fetchCategoriesError(error)));
  };
}