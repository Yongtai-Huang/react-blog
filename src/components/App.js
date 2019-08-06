import agent from '../agent';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Article from '../views/Article';
import ArticleEdit from '../views/ArticleEdit';
import Articles from '../views/Articles';
import Login from '../views/Login';
import Profile from '../views/Profile';
import UpvotedArticles from '../views/UpvotedArticles';
import DownvotedArticles from '../views/DownvotedArticles';
import Register from '../views/Register';
import Settings from '../views/Settings';
import { store } from '../store';
import { push } from 'connected-react-router';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />
            <Switch>
              <Route exact path="/" component={Articles}/>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/article-edit/:slug" component={ArticleEdit} />
              <Route path="/article-edit" component={ArticleEdit} />
              <Route path="/article/:id" component={Article} />
              <Route path="/settings" component={Settings} />
              <Route path="/@:username/upvoted-articles" component={UpvotedArticles} />
              <Route path="/@:username/downvoted-articles" component={DownvotedArticles} />
              <Route path="/@:username" component={Profile} />
            </Switch>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
