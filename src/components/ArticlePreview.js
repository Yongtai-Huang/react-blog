import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  ARTICLE_UPVOTED,
  ARTICLE_UNUPVOTED,
  ARTICLE_DOWNVOTED,
  ARTICLE_UNDOWNVOTED
} from '../constants/actionTypes';
import { AVATAR_URL } from '../common/config';

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  upvote: slug => dispatch({
    type: ARTICLE_UPVOTED,
    payload: agent.Articles.upvote(slug)
  }),
  unupvote: slug => dispatch({
    type: ARTICLE_UNUPVOTED,
    payload: agent.Articles.unupvote(slug)
  }),
  downvote: slug => dispatch({
    type: ARTICLE_DOWNVOTED,
    payload: agent.Articles.downvote(slug)
  }),
  undownvote: slug => dispatch({
    type: ARTICLE_UNDOWNVOTED,
    payload: agent.Articles.undownvote(slug)
  })
});

const ArticlePreview = props => {
  const article = props.article;

  const upvotedClass = article.upvoted ? 'text-danger' : '';
  const downvotedClass = article.downvoted ? 'text-success' : '';

  const handleUpvoteClick = ev => {
    ev.preventDefault();
    if (article.upvoted) {
      props.unupvote(article.slug);
    } else {
      props.upvote(article.slug);
    }
  };

  const handleDownvoteClick = ev => {
    ev.preventDefault();
    if (article.downvoted) {
      props.undownvote(article.slug);
    } else {
      props.downvote(article.slug);
    }
  };

  return (
    <div className="article-preview">
      <hr />
      <div className="article-meta d-flex align-items-center">

        <Link to={`/@${article.author.username}`}>
          { article.author.image &&
            <img src={`${AVATAR_URL}/${article.author.image}`} className="user-image-sm" alt={article.author.username} />
          }
        </Link>

        <div className="info">
          <Link className="author" to={`/@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="text-muted ml-3">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div className="ml-auto">
          <button type="button" className="link-button" onClick={handleUpvoteClick}
            disabled={props.currentUser && props.currentUser.username === article.author.username}>
            <span className={upvotedClass}>
              <i className="fa fa-thumbs-up" aria-hidden="true"></i> {article.upvotesCount}
            </span>
          </button>
          
          <button className="link-button" onClick={handleDownvoteClick}
            disabled={props.currentUser && props.currentUser.username === article.author.username}>
            <span className={downvotedClass}>
              <i className="fa fa-thumbs-down" aria-hidden="true"></i> {article.downvotesCount}
            </span>
          </button>
        </div>
      </div>

      <div>
        <h5>{article.title}</h5>
        <p>{article.description}</p>
        <Link to={`/article/${article.slug}`} className="preview-link">
          Read more...
        </Link>
      </div>
    </div>
  );
};

export default connect( mapStateToProps, mapDispatchToProps)(ArticlePreview);

