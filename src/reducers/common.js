import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  ARTICLE_SUBMITTED,
  SETTINGS_SAVED,
  LOGIN,
  REGISTER,
  DELETE_ARTICLE,
  ARTICLE_UNLOADED,
  ARTICLE_EDIT_UNLOADED,
  ARTICLES_UNLOADED,
  PROFILE_UNLOADED,
  PROFILE_UPVOTED_ARTICLES_UNLOADED,
  PROFILE_DOWNVOTED_ARTICLES_UNLOADED,
  SETTINGS_UNLOADED,
  LOGIN_UNLOADED,
  REGISTER_UNLOADED
} from '../constants/actionTypes';

const defaultState = {
  appName: 'React Blog',
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return { ...state, redirectTo: '/', token: null, currentUser: null };
    case ARTICLE_SUBMITTED:
      const redirectUrl = `/article/${action.payload.article.slug}`;
      return { ...state, redirectTo: redirectUrl };
    case SETTINGS_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload.user
      };
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
    case DELETE_ARTICLE:
      return { ...state, redirectTo: '/' };
    case ARTICLE_UNLOADED:
    case ARTICLE_EDIT_UNLOADED:
    case ARTICLES_UNLOADED:
    case PROFILE_UNLOADED:
    case PROFILE_UPVOTED_ARTICLES_UNLOADED:
    case PROFILE_DOWNVOTED_ARTICLES_UNLOADED:
    case SETTINGS_UNLOADED:
    case LOGIN_UNLOADED:
    case REGISTER_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    default:
      return state;
  }
};
