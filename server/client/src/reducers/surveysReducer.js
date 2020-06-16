import { FETCH_SURVEYS } from '../actions/types';
    ///reducer gonna listen for this action type

    //empty array bc always returning array 
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload
    default:
      return state;
  }
} 