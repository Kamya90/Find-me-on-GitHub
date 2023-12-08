import React, { Fragment, Component } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class User extends Component {
  // componentDidMount(){
  //   this.props.getUser(this.props.match.params.login);
  // }
  componentDidMount() {
    const username = this.props.username;
    //console.log("MY USER ", this.props.user.login)
    if (username !== this.props.user.login) {
      this.props.getUser(username);
    }
    //console.log("text", this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
  };

  render() {
    const {
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    } = this.props.user;

    const { loading } = this.props;
    // if (loading)
    //   return <Spinner/>
    //   else{
    console.log("RENDERRRR ", this.props.user);

    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          Back to Search
        </Link>
        <p style={{ fontSize: "2rem", color: "black" }}>{login}</p>
        Hireable:{" "}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-check text-danger" />
        )}
      </Fragment>
    );

    // }
  }
}

export default User;
