import { Profile, mapStateToProps } from './Profile';
import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  PROFILE_LOADED,
  PROFILE_UNLOADED
} from '../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onLoad: (pager, payload) =>
    dispatch({ type: PROFILE_LOADED, pager, payload }),
  onUnload: () =>
    dispatch({ type: PROFILE_UNLOADED })
});

class DownvotedArticles extends Profile {
  componentWillMount() {
    this.props.onLoad(page => agent.Articles.downvotedBy(this.props.match.params.username, page), Promise.all([
      agent.Profile.get(this.props.match.params.username),
      agent.Articles.downvotedBy(this.props.match.params.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.profile.username}/upvoted-articles`}>
            Upvoted Articles
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${this.props.profile.username}/downvoted-articles`}>
            Downvoted Articles
          </Link>
        </li>
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownvotedArticles);
