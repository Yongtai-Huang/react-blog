import {
  ARTICLE_LOADED,
  ARTICLE_UNLOADED,
  ADD_ARTICLE_COMMENT,
  DELETE_ARTICLE_COMMENT
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_LOADED:
      return {
        ...state,
        article: action.payload[0].article,
        comments: action.payload[1].articleComments
      };
    case ARTICLE_UNLOADED:
      return {};
    case ADD_ARTICLE_COMMENT:
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error ?
          null :
          [action.payload.articleComment].concat(state.comments || [])
      };
    case DELETE_ARTICLE_COMMENT:
      const commentId = action.commentId
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== commentId)
      };
    default:
      return state;
  }
};
