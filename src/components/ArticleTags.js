import React from 'react';
import agent from '../agent';

const ArticleTags = props => {
  const tags = props.tags;
  if (tags) {
    return (
      <div className="tag-list">
        {
          tags.map(tag => {
            const handleClick = ev => {
              ev.preventDefault();
              props.onClickTag(tag, page => agent.Articles.getByTag(tag, page), agent.Articles.getByTag(tag));
            };

            return (
              <button
                className="btn btn-sm btn-info m-1"
                key={tag}
                onClick={handleClick}>
                {tag}
              </button>
            );
          })
        }
      </div>
    );
  }

  return (
    <div>Loading Tags...</div>
  );

};

export default ArticleTags;
