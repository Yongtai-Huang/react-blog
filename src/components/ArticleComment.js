import DeleteArticleComment from './DeleteArticleComment';
import { Link } from 'react-router-dom';
import React from 'react';
import { AVATAR_URL } from '../common/config';

const ArticleComment = props => {
  const comment = props.comment;
  const show = props.currentUser &&
    props.currentUser.username === comment.author.username;
  const commentBodyStyle = {'whiteSpace': 'pre-line'};
  return (
    <div className="card mb-3">
      <div className="card-block px-2 py-3">
        <p className="card-text" style={commentBodyStyle}>{comment.body}</p>
      </div>
      <div className="card-footer py-2 d-flex">
        <Link
          to={`/@${comment.author.username}`}
          className="comment-author">
          {comment.author.image &&
            <img src={`${AVATAR_URL}/${comment.author.image}`} className="user-image-sm" alt={comment.author.username} />
          }
        </Link>
        &nbsp;
        <Link
          to={`/@${comment.author.username}`}
          className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted text-muted ml-3">
          {new Date(comment.createdAt).toDateString()}
        </span>
        <div className="ml-auto">
          <DeleteArticleComment show={show} slug={props.slug} commentId={comment.id} />
        </div>
        
      </div>
    </div>
  );
};

export default ArticleComment;
