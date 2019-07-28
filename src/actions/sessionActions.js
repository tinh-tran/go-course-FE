import UserService from '../services/UserService';
import {loginSuccess,logOut} from '../actions';
import { push } from 'react-router-redux'
import history from '../history/history.js';

export function Login(credentials) {  
  return function(dispatch) {
    return UserService.login(credentials).then(response => {
      sessionStorage.setItem('jwt', response.Token);
	  sessionStorage.setItem('role', response.Role);
	  sessionStorage.setItem('user', response.User);
	  sessionStorage.setItem('studentid', response.StudentId);
	  if(sessionStorage.user == "admin") 
		  history.push('/admin')
		else
			history.push('/')	
      dispatch(loginSuccess());
    }).catch(error => {
      throw(error);
    });
  };
 }
 
export function logOutUser() {  
	return function(dispatch){
		sessionStorage.setItem('jwt', "");
		sessionStorage.setItem('role', "");
		sessionStorage.setItem('user', "");
		sessionStorage.setItem('studentid', "");
		dispatch(logOut())
		history.push('/')
	}
}

export function isAdminAuthen(){
	console.log("isAdminAuthen")
	return function(dispatch) {
	if (
		(sessionStorage.jwt != null ) 
		&& typeof(sessionStorage.jwt) != "undefined" 
		&& (sessionStorage.jwt != "" ) 
		&& (sessionStorage.user != null ) 
		&& typeof(sessionStorage.user) != "undefined" 
		&& (sessionStorage.user != "" )
		&& (sessionStorage.jwt != "undefined") 
		&& (sessionStorage.user != "undefined" )
		&& typeof(sessionStorage.role) != "undefined" 
		&& (sessionStorage.role != "undefined") 
		&& (sessionStorage.role == "admin" )
		){
		return true;
	}
	else return false;
	}
}
export function isUserAuthen(){
	console.log("isUserAuthen")
	return function(dispatch) {
	if (
		(sessionStorage.jwt != null ) 
		&& typeof(sessionStorage.jwt) != "undefined" 
		&& (sessionStorage.jwt != "" ) 
		&& (sessionStorage.user != null ) 
		&& typeof(sessionStorage.user) != "undefined" 
		&& (sessionStorage.user != "" )
		&& (sessionStorage.jwt != "undefined") 
		&& (sessionStorage.user != "undefined" )
		&& typeof(sessionStorage.studentid) != "undefined" 
		&& (sessionStorage.studentid != "undefined") 
		&& (sessionStorage.studentid != "null" )
		&& !isNaN(sessionStorage.studentid ) 
		){
		return true;
	}
	else return false;
	}
}

export function isAuthen(){
	return function(dispatch) {
	if (
		(sessionStorage.jwt != null ) 
		&& typeof(sessionStorage.jwt) != "undefined" 
		&& (sessionStorage.jwt != "" ) 
		&& (sessionStorage.user != null ) 
		&& typeof(sessionStorage.user) != "undefined" 
		&& (sessionStorage.user != "" )
		&& (sessionStorage.jwt != "undefined") 
		&& (sessionStorage.user != "undefined" )
		){
		return true;
	}
	else return false;
	}
}

