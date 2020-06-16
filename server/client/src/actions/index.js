import axios from 'axios'; 
import { FETCH_USER, FETCH_SURVEYS } from './types';

///redux thunk's job is to inspect whatever value is returned from the action creator 
/// if it sees we return a function, it will automatically call the function and pass the dispatch as an argument 
// export const fetchUser = () => 
  // return function(dispatch) { ///now whenever aciton creator is called, it will instantly return a function
  //   axios.get('/api/current_user').then(response => {
  //     dispatch({type:FETCH_USER, payload: response});
  //   });
  export const fetchUser = () => async dispatch => {
    const response = await axios.get('/api/current_user');
    dispatch({type:FETCH_USER, payload: response.data});
  };

  export const handleToken = (token) => async dispatch => {
    //post request bc we are sending info along with request
    const response = await axios.post('/api/stripe', token);
    //bc we are getting back the same user model, so we want to dispatch the same action type to update the user // header
    dispatch({type:FETCH_USER, payload: response.data});




  };

  export const submitSurvey = (values, history) => async dispatch => {
    const response = await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({type:FETCH_USER, payload: response.data});
  }


  export const fetchSurveys = () =>  async dispatch => {
    const response = await axios.get('/api/surveys');
    dispatch({type: FETCH_SURVEYS, payload: response.data})
    //payload is array of all surveys 

  };

  /*  old version 
  return {
    type: FETCH_USER,
    payload: request
  }
  */

