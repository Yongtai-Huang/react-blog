import {
  ARTICLE_EDIT_LOADED,
  ARTICLE_EDIT_UNLOADED,
  ARTICLE_SUBMITTED,
  ASYNC_START,
  ADD_ARTICLE_TAG,
  REMOVE_ARTICLE_TAG,
  UPDATE_ARTICLE_EDIT_FIELD
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_EDIT_LOADED:
      return {
        ...state,
        articleSlug: action.payload ? action.payload.article.slug : '',
        title: action.payload ? action.payload.article.title : '',
        description: action.payload ? action.payload.article.description : '',
        body: action.payload ? action.payload.article.body : '',
        tagInput: '',
        tagList: action.payload ? action.payload.article.tagList : [],
        image: action.payload ? action.payload.article.image : ''
      };
    case ARTICLE_EDIT_UNLOADED:
      return {};
    case ARTICLE_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      };
    case ASYNC_START:
      if (action.subtype === ARTICLE_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    case ADD_ARTICLE_TAG:
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      };
    case REMOVE_ARTICLE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      };
    case UPDATE_ARTICLE_EDIT_FIELD:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }

  return state;
};
