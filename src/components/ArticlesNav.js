import ArticleList from './ArticleList';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../constants/actionTypes';

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    }

    return (
      <li className="nav-item">
        <button type="button"
            className={ props.tab === 'feed' ? 'link-button' : 'link-button'}
            onClick={clickHandler}>
          Your Feed
        </button>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <button type="button"
        className={ props.tab === 'all' ? 'link-button ml-2' : 'link-button ml-2' }
        onClick={clickHandler}>
        Global Feed
      </button>
    </li>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.articles.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const ArticlesNav = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick} />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

        </ul>
      </div>

      <ArticleList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesNav);
