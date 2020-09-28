import { combineReducers } from "redux";
import { ALL_TASK, ADD_TASK, DELETE_TASK, SIGN_IN, SIGN_OUT } from "../actions";

const initialTaskState = {
  list: [],
  isLoggedIn: false,
  isLoggedOut: true,
};

export function tasks(state = initialTaskState, action) {
  switch (action.type) {
    case ALL_TASK:
      return {
        ...state,
        list: action.tasks,
      };

    case SIGN_IN:
      return {
        ...state,
        isLoggedIn: true,
        isLoggedOut: false,
      };

    case SIGN_OUT:
      return {
        ...state,
        isLoggedIn: false,
        isLoggedOut: true,
      };

    case DELETE_TASK:
      const filteredArray = state.list.filter(
        (task) => task.id !== action.task.id
      );
      return {
        ...state,
        list: filteredArray,
      };
    case ADD_TASK: {
      return {
        ...state,
        list: [action.task, ...state.list],
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  tasks,
});
