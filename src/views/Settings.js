import ListErrors from '../components/ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  SETTINGS_SAVED,
  SETTINGS_UNLOADED,
  LOGOUT
} from '../constants/actionTypes';
import { AVATAR_URL } from '../common/config';

class SettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
      removePhoto: false
    };

    this.uploadFile = React.createRef();
    this.updateState = this.updateState.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        image: this.props.currentUser.image || '',
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio,
        email: this.props.currentUser.email
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        image: nextProps.currentUser.image || '',
        username: nextProps.currentUser.username,
        bio: nextProps.currentUser.bio,
        email: nextProps.currentUser.email
      }));
    }
  }

  updateState(field) {
    return (ev) => {
      const state = this.state;
      const newState = Object.assign({}, state, {
        [field]: ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
      });
      this.setState(newState);
    };
  };

  submitForm(ev) {
    ev.preventDefault();
    const formData = new FormData();
    if (this.uploadFile.current.files[0]) {
      const file = this.uploadFile.current.files[0];
      formData.append('uploadFile', file, file.name);
    }

    formData.append('username', this.state.username);
    if (this.state.email) {
      formData.append('email', this.state.email);
    }

    if (this.state.password) {
      formData.append('password', this.state.password);
    }
  
    if (this.state.bio) {
      formData.append('bio', this.state.bio);
    }

    if (this.state.removePhoto === true) {
      formData.append('removePhoto', 'true');
    }

    this.props.onSubmitForm(formData);
  };

  render() {
    return (
      <div className="container page">
        <div className="row">
            <div className="col-md-4 col-sm-12">
              { this.props.currentUser && this.props.currentUser.image &&
                <React.Fragment>
                  <img src={`${AVATAR_URL}/${this.props.currentUser.image}`}
                    className="user-image-lg" alt={this.props.currentUser.username} />

                  <div className="text-center py-2">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input"
                        value={this.state.removePhoto}
                        onChange={this.updateState('removePhoto')} />
                      &nbsp;Remove Photo
                    </label>
                  </div>
                </React.Fragment>
              }
            </div>
            <div className="col-md-8 col-sm-12">

            <form onSubmit={this.submitForm}>
              <div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    value={this.state.image}
                    onChange={this.updateState('image')} />
                </div>

                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.updateState('username')} />
                </div>

                <div className="form-group">
                  <input
                    className="form-control"
                    type="file" name="uploadFile" ref={this.uploadFile}/>
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Short bio about you"
                    value={this.state.bio}
                    onChange={this.updateState('bio')}>
                  </textarea>
                </div>

                <div className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.updateState('email')} />
                </div>

                <div className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="New Password"
                    value={this.state.password}
                    onChange={this.updateState('password')} />
                </div>

                <button
                  className="btn btn-danger"
                  type="submit"
                  disabled={this.state.inProgress}>
                  Update Settings
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: user =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_UNLOADED })
});

class Settings extends React.Component {
  render() {
    return (
      <div className="settings-page">
        <div className="container page">
          <h1 className="text-xs-center">Your Settings</h1>

          <ListErrors errors={this.props.errors}></ListErrors>

          <SettingsForm
            currentUser={this.props.currentUser}
            onSubmitForm={this.props.onSubmitForm} />

          <hr />

          <button
            className="btn btn-outline-danger"
            onClick={this.props.onClickLogout}>
            Or click here to logout.
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
