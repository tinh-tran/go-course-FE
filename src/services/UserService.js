import {UserApi} from '../config.js';

class UserService {  
  static login(credentials) {
    const request = new Request(UserApi + '/api/User/login', {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
      }), 
      body: credentials
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  } 
}

export default UserService;