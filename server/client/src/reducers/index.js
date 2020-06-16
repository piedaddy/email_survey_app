import {combineReducers} from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

//these keys will represent the state
//says that auth is being managed by auth Reducer
export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
}); 