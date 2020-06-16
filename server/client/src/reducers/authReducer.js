import { FETCH_USER } from '../actions/types';
//import the action type and then watch for that action to be entered into reducer

export default function(state = null, action) {
  console.log(action)
 
  switch (action.type) {
    case FETCH_USER: 
      return action.payload || false //user model //this is so that if the payload is "" which is falsey it will return false 
    default: 
      return state
  }
};