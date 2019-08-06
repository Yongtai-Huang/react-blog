import { ARTICLES_LOADED, ARTICLES_UNLOADED } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ARTICLES_LOADED:
      return {
        ...state,
        tags: action.payload[0].tags
      };
    case ARTICLES_UNLOADED:
      return {};
    default:
      return state;
  }
};
