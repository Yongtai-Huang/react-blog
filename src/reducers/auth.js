import {
  LOGIN,
  REGISTER,
  LOGIN_UNLOADED,
  REGISTER_UNLOADED,
  ASYNC_START,
  UPDATE_AUTH_FIELD
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case LOGIN_UNLOADED:
    case REGISTER_UNLOADED:
      return {};
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return { ...state, inProgress: true };
      }
      break;
    case UPDATE_AUTH_FIELD:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }

  return state;
};
