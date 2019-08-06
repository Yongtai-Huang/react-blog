import Banner from '../components/Banner';
import ArticlesNav from '../components/ArticlesNav';
import React from 'react';
import ArticleTags from '../components/ArticleTags';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  ARTICLES_LOADED,
  ARTICLES_UNLOADED,
  APPLY_TAG_FILTER
} from '../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.articles,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: ARTICLES_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: ARTICLES_UNLOADED })
});

class Articles extends React.Component {
  componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token ?
      agent.Articles.feed :
      agent.Articles.all;

    this.props.onLoad(tab, articlesPromise, Promise.all([agent.ArticleTags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="articles-page">

        <Banner token={this.props.token} appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <div className="col-sm-12 col-md-9">
              <ArticlesNav />
            </div>

            <div className="col-sm-12 col-md-3">
              <div className="sidebar">

                <h6>Popular Tags</h6>

                <ArticleTags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag} />

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
