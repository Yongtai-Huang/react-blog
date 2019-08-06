import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGOUT } from '../constants/actionTypes';
import { AVATAR_URL } from '../common/config';

const MainView = props => {
  return (
    <ul className="navbar-nav mx-auto">

      <li className="nav-item">
        <Link to="/" className="nav-link">
          <i className="fa fa-home" aria-hidden="true"></i>&nbsp;Home
        </Link>
      </li>

      { props.currentUser && 
        <li className="nav-item">
          <Link to="/article-edit" className="nav-link">
            <i className="fa fa-pencil-square-o" aria-hidden="true">&nbsp;New Post</i>
          </Link>
        </li>
      }
    </ul>
  );
};

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="navbar-nav  ml-auto">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li>

      </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.username}`}
            className="nav-link"
            data-toggle="tooltip" data-placement="top" title="Profile">
            { props.currentUser.image &&
              <img src={`${AVATAR_URL}/${props.currentUser.image}`} className="user-image-sm" alt={props.currentUser.username} />
            }
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    );
  }

  return null;
};

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT })
});

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-flex align-items-center">

          <Link to="/" className="navbar-brand">
            <span className="text-danger"><strong>{this.props.appName}</strong></span>
          </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <MainView currentUser={this.props.currentUser} />
            <LoggedOutView currentUser={this.props.currentUser} />
            <LoggedInView currentUser={this.props.currentUser} />

            { this.props.currentUser &&
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button type="button"
                    className="link-button"
                    onClick={this.props.onClickLogout}
                    data-toggle="tooltip" data-placement="top" title="Sign out">
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                  </button>
                </li>
              </ul>
            }
            
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(null, mapDispatchToProps)(Header);

