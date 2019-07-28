import * as actionType from '../actions/ActionType';

const initialState = {
  session: sessionStorage
};

export const userReducer = (state = initialState.session, action) =>  {  
  switch(action.type) {
    case actionType.LOG_IN_SUCCESS:
      return sessionStorage
	case actionType.LOG_OUT:
      return sessionStorage
    default: 
      return null;
  }
}
