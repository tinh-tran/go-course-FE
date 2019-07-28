import { combineReducers } from 'redux';
import employeeReducer from './counterReducer';


const employeeApp = combineReducers({
  employeeReducer
})

export default employeeApp
