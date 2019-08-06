import {
  ARTICLE_UPVOTED,
  ARTICLE_UNUPVOTED,
  ARTICLE_DOWNVOTED,
  ARTICLE_UNDOWNVOTED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  ARTICLES_LOADED,
  ARTICLES_UNLOADED,
  CHANGE_TAB,
  PROFILE_LOADED,
  PROFILE_UNLOADED,
  PROFILE_UPVOTED_ARTICLES_LOADED,
  PROFILE_UPVOTED_ARTICLES_UNLOADED,
  PROFILE_DOWNVOTED_ARTICLES_LOADED,
  PROFILE_DOWNVOTED_ARTICLES_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_UPVOTED:
    case ARTICLE_UNUPVOTED:
      return {
        ...state,
        articles: state.articles.map(article => {
          if (article.slug === action.payload.article.slug) {
            return {
              ...article,
              downvoted: action.payload.article.downvoted,
              downvotesCount: action.payload.article.downvotesCount,
              upvoted: action.payload.article.upvoted,
              upvotesCount: action.payload.article.upvotesCount
            };
          }
          return article;
        })
      };
    case ARTICLE_DOWNVOTED:
    case ARTICLE_UNDOWNVOTED:
      return {
        ...state,
        articles: state.articles.map(article => {
          if (article.slug === action.payload.article.slug) {
            return {
              ...article,
              downvoted: action.payload.article.downvoted,
              downvotesCount: action.payload.article.downvotesCount,
              upvoted: action.payload.article.upvoted,
              upvotesCount: action.payload.article.upvotesCount
            };
          }
          return article;
        })
      };
    case SET_PAGE:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: action.page
      };
    case APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case ARTICLES_LOADED:
      return {
        ...state,
        pager: action.pager,
        tags: action.payload[0].tags,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        currentPage: 0,
        tab: action.tab
      };
    case ARTICLES_UNLOADED:
      return {};
    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: action.tab,
        currentPage: 0,
        tag: null
      };
    case PROFILE_LOADED:
    case PROFILE_UPVOTED_ARTICLES_LOADED:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        currentPage: 0
      };
    case PROFILE_DOWNVOTED_ARTICLES_LOADED:
        return {
          ...state,
          pager: action.pager,
          articles: action.payload[1].articles,
          articlesCount: action.payload[1].articlesCount,
          currentPage: 0
        };
    case PROFILE_UNLOADED:
    case PROFILE_UPVOTED_ARTICLES_UNLOADED:
      return {};
    case PROFILE_DOWNVOTED_ARTICLES_UNLOADED:
      return {};
    default:
      return state;
  }
};
