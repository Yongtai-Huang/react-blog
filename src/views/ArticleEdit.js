import ListErrors from '../components/ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  ADD_ARTICLE_TAG,
  ARTICLE_EDIT_LOADED,
  REMOVE_ARTICLE_TAG,
  ARTICLE_SUBMITTED,
  ARTICLE_EDIT_UNLOADED,
  UPDATE_ARTICLE_EDIT_FIELD
} from '../constants/actionTypes';
import { ARTICLE_IMAGE_URL } from '../common/config';

const mapStateToProps = state => ({
  ...state.articleEdit
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: ADD_ARTICLE_TAG }),
  onLoad: payload =>
    dispatch({ type: ARTICLE_EDIT_LOADED, payload }),
  onRemoveTag: tag =>
    dispatch({ type: REMOVE_ARTICLE_TAG, tag }),
  onSubmit: payload =>
    dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: ARTICLE_EDIT_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_ARTICLE_EDIT_FIELD, key, value })
});

class ArticleEdit extends React.Component {
  constructor() {
    super();

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value);

    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');
    this.toggleRemoveImage = updateFieldEvent('removeImage');
    this.uploadFile = React.createRef();
    this.watchForEnter = this.watchForEnter.bind(this);
    this.removeTagHandler = this.removeTagHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  watchForEnter(ev) {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      this.props.onAddTag();
    }
  };

  removeTagHandler(tag) {
    return () => {
      this.props.onRemoveTag(tag);
    };
  };

  submitForm(ev) {
    ev.preventDefault();
    // Handle the tag not press Enter
   
    const formData = new FormData();
    formData.append('title', this.props.title);
    formData.append('body', this.props.body);
    if (this.props.description) {
      formData.append('description', this.props.description);
    }

    if (this.props.tagList.length > 0) {
      formData.append('tagList', JSON.stringify(this.props.tagList));
    }

    if (this.uploadFile.current.files[0]) {
      const file = this.uploadFile.current.files[0];
      formData.append('uploadFile', file, file.filename);
    }

    if (this.props.removeImage === true) {
      formData.append('removeImage', 'true');
    }

    const promise = this.props.articleSlug ?
      agent.Articles.update(this.props.articleSlug, formData) :
      agent.Articles.create(formData);

    this.props.onSubmit(promise);
  };

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ListErrors errors={this.props.errors}></ListErrors>

              <h4 className="text-center py-2"> {this.props.articleSlug ? 'Update ' : 'Add '} Article</h4>

              { this.props.image &&
                <React.Fragment>
                  <img src={`${ARTICLE_IMAGE_URL}/${this.props.image}`}
                    className="article-img" alt={this.props.title} />

                  <div className="text-center py-2">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input"
                        value={this.props.removeImage}
                        onChange={this.toggleRemoveImage} />
                      &nbsp;Remove Image
                    </label>
                  </div>
                </React.Fragment>
              }

              <form>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Article Title"
                    value={this.props.title}
                    onChange={this.changeTitle} />
                </div>

                <div className="form-group">
                  <label htmlFor="file">
                    Image file:
                  </label>
                  <input
                    className="form-control"
                    type="file" id="file" ref={this.uploadFile} />
                </div>

                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="What's this article about?"
                    value={this.props.description}
                    onChange={this.changeDescription} />
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    value={this.props.body}
                    onChange={this.changeBody}>
                  </textarea>
                </div>

                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter tags"
                    value={this.props.tagInput}
                    onChange={this.changeTagInput}
                    onKeyUp={this.watchForEnter} />

                  <div className="tag-list">
                    {
                      (this.props.tagList || []).map(tag => {
                        return (
                          <span className="tag-default tag-pill" key={tag}>
                            <i className="fa fa-times" aria-hidden="true"
                              onClick={this.removeTagHandler(tag)}>
                            </i>
                            &nbsp;{tag}
                          </span>
                        );
                      })
                    }
                  </div>
                </div>

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={this.props.inProgress}
                  onClick={this.submitForm}>
                  Publish Article
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);
