import article from './reducers/article';
import articleList from './reducers/articleList';
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import articleEdit from './reducers/articleEdit';
import articles from './reducers/articles';
import profile from './reducers/profile';
import settings from './reducers/settings';
import { connectRouter } from 'connected-react-router';

export default (history) => combineReducers({
  article,
  articleList,
  auth,
  common,
  articleEdit,
  articles,
  profile,
  settings,
  router: connectRouter(history)
});
