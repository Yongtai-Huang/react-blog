import ArticleComment from './ArticleComment';
import React from 'react';

const ArticleCommentList = props => {
  return (
    <div>
      {
        props.comments.map(comment => {
          return (
            <ArticleComment
              comment={comment}
              currentUser={props.currentUser}
              slug={props.slug}
              key={comment.id} />
          );
        })
      }
    </div>
  );
};

export default ArticleCommentList;
