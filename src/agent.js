import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

import API_ROOT from "./common/config";

const superagent = superagentPromise(_superagent, global.Promise);

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', user)
};

const ArticleTags = {
  getAll: () => requests.get('/articleTags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const Articles = {
  all: page =>
    requests.get(`/articles?${limit(10, page)}`),
  getByAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  getByTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  upvote: slug =>
    requests.post(`/articles/${slug}/upvote`),
  upvotedBy: (user, page) =>
    requests.get(`/articles?upvoted=${encode(user)}&${limit(5, page)}`),
  downvote: slug =>
    requests.post(`/articles/${slug}/downvote`),
  downvotedBy: (user, page) =>
    requests.get(`/articles?downvoted=${encode(user)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/articles/${slug}`),
  unupvote: slug =>
    requests.del(`/articles/${slug}/upvote`),
  undownvote: slug =>
    requests.del(`/articles/${slug}/downvote`),
  update: (slug, article) =>
    requests.put(`/articles/${slug}`, article ),
  create: article =>
    requests.post('/articles', article)
};

const ArticleComments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/articleComments`, { 
      articleComment: comment
    }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/articleComments/${commentId}`),
  get: slug =>
    requests.get(`/articles/${slug}/articleComments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default {
  Articles,
  Auth,
  ArticleComments,
  Profile,
  ArticleTags,
  setToken: _token => { token = _token; }
};
