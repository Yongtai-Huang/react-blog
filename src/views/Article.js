import ArticleMeta from '../components/ArticleMeta';
import ArticleCommentContainer from '../components/ArticleCommentContainer';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import marked from 'marked';
import { ARTICLE_LOADED, ARTICLE_UNLOADED } from '../constants/actionTypes';
import { ARTICLE_IMAGE_URL } from '../common/config';

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: ARTICLE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: ARTICLE_UNLOADED })
});

class Article extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Articles.get(this.props.match.params.id),
      agent.ArticleComments.get(this.props.match.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.article) {
      return null;
    }

    const markup = { __html: marked(this.props.article.body, { sanitize: true }) };
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.article.author.username;
    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">

            <h4>{this.props.article.title}</h4>
            <ArticleMeta
              article={this.props.article}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row article-content">
            <div className="col-sm-12">

              { this.props.article.image &&
                <React.Fragment>
                  <img src={`${ARTICLE_IMAGE_URL}/${this.props.article.image}`}
                    className="article-img py-3 d-flex mx-auto" alt={this.props.article.title} />
                </React.Fragment>
              }

              <div className="py-3" dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {
                  this.props.article.tagList.map(tag => {
                    return (
                      <li
                        className="badge badge-pill badge-secondary"
                        key={tag}>
                        <h6>{tag}</h6>
                      </li>
                    );
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="article-actions">
          </div>

          <div className="row">
            <ArticleCommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
