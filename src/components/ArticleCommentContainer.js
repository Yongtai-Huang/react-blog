import ArticleCommentEdit from './ArticleCommentEdit';
import ArticleCommentList from './ArticleCommentList';
import { Link } from 'react-router-dom';
import React from 'react';

const ArticleCommentContainer = props => {
  if (props.currentUser) {
    return (
      <div className="col-sm-12 col-md-8 offset-md-2">
        <div>
          <list-errors errors={props.errors}></list-errors>
          <ArticleCommentEdit slug={props.slug} currentUser={props.currentUser} />
        </div>

        <h5 className="text-danger mt-5 mb-3">Comments</h5>
        <ArticleCommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser} />
      </div>
    );
  }

  return (
    <div className="col-sm-12 col-md-8 offset-md-2">
      <p>
        <Link to="/login">Sign in</Link>
        &nbsp;or&nbsp;
        <Link to="/register">sign up</Link>
        &nbsp;to add comments on this article.
      </p>

      <ArticleCommentList
        comments={props.comments}
        slug={props.slug}
        currentUser={props.currentUser} />
    </div>
  );
};

export default ArticleCommentContainer;
