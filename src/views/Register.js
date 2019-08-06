import { Link } from 'react-router-dom';
import ListErrors from '../components/ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_AUTH_FIELD,
  REGISTER,
  REGISTER_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_AUTH_FIELD, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_AUTH_FIELD, key: 'password', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_AUTH_FIELD, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);

    this.submitForm = this.submitForm.bind(this); 
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  submitForm(username, email, password) {
    return ev => {
      ev.preventDefault();
      this.props.onSubmit(username, email, password);
    };
  };

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(username, email, password)}>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={this.props.username}
                    onChange={this.changeUsername} />
                </div>

                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={this.props.email}
                    onChange={this.changeEmail} />
                </div>

                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={this.props.password}
                    onChange={this.changePassword} />
                </div>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={this.props.inProgress}>
                  Sign up
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
