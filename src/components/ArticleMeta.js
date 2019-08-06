import ArticleActions from './ArticleActions';
import { Link } from 'react-router-dom';
import React from 'react';
import { AVATAR_URL } from '../common/config';

const ArticleMeta = props => {
  const article = props.article;
  return (
    <div className="article-meta d-flex">
      <Link to={`/@${article.author.username}`}>
        { article.author.image &&
          <img src={`${AVATAR_URL}/${article.author.image}`} className="user-image-sm" alt={article.author.username} />
        }
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="text-muted ml-3">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>
      
      <div className="ml-auto">
        <ArticleActions canModify={props.canModify} article={article} />
      </div>
      
    </div>
  );
};

export default ArticleMeta;
