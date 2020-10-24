import React from "react"

import md5 from "md5"

import './UserCard.scss';

class UserCard extends React.Component {

  render() {

    const { user } = this.props;
    const { name, email, rating } = user;

    const usercode = md5(email);

    return (
      <div className="card">
        <div className="card-header">
          <img src={`https://www.gravatar.com/avatar/${usercode}?d=retro`} alt="" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{name} [{rating}]</h5>
          <p className="card-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            Update your image on <a target="newtab" href="https://en.gravatar.com/">Gravatar</a>
          </small>
        </div>
      </div>
    )
  }
}

export default UserCard;

