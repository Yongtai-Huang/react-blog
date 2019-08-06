import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { ADD_ARTICLE_COMMENT } from '../constants/actionTypes';
import { AVATAR_URL } from '../common/config';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: ADD_ARTICLE_COMMENT, payload })
});

class ArticleCommentEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      body: ''
    };

    this.setBody = this.setBody.bind(this);

    this.createComment = this.createComment.bind(this);
  }

  setBody(ev) {
    this.setState({ body: ev.target.value });
  };

  createComment(ev) {
    ev.preventDefault();
    const payload = agent.ArticleComments.create(this.props.slug,
      { body: this.state.body });
    this.setState({ body: '' });
    this.props.onSubmit(payload);
  };

  render() {
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea className="form-control"
            placeholder="Write a comment..."
            value={this.state.body}
            onChange={this.setBody}
            rows="3">
          </textarea>
        </div>
        <div className="card-footer">
          {this.props.currentUser.image &&
            <img
            src={`${AVATAR_URL}/${this.props.currentUser.image}`}
            className="user-image-sm"
            alt={this.props.currentUser.username} />
          }
          
          <button
            className="btn btn-sm btn-danger float-right"
            type="submit">
            Post Comment
          </button>
        </div>
      </form>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(ArticleCommentEdit);
