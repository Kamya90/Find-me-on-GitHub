import React, { Fragment, Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
 // username : '' //we'll be needing some setState shit!!!!!!
  };

  // async componentDidMount(){
  //   this.setState({loading:true});
  //   const res= axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({users:(await res).data, loading:false});
  // }

  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
   
    this.setState({ users: res.data.items, loading: false });
  };
  getUser = async (username) => {
    // this.setState({ loading: true });
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      console.log("HEREEEE ", res.data)
    this.setState({ user: res.data });
    } catch (error) {
      console.log("API FAILED ", error)
    }

    // console.log("USER RES ", res)
    const mockUser = {
      "login": "octocat",
      "id": 1,
      "node_id": "MDQ6VXNlcjE=",
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      "gravatar_id": "",
      "url": "https://api.github.com/users/octocat",
      "html_url": "https://github.com/octocat",
      "followers_url": "https://api.github.com/users/octocat/followers",
      "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      "organizations_url": "https://api.github.com/users/octocat/orgs",
      "repos_url": "https://api.github.com/users/octocat/repos",
      "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/octocat/received_events",
      "type": "User",
      "site_admin": false,
      "name": "monalisa octocat",
      "company": "GitHub",
      "blog": "https://github.com/blog",
      "location": "San Francisco",
      "email": "octocat@github.com",
      "hireable": true,
      "bio": "There once was...",
      "twitter_username": "monatheoctocat",
      "public_repos": 2,
      "public_gists": 1,
      "followers": 20,
      "following": 0,
      "created_at": "2008-01-14T04:33:35Z",
      "updated_at": "2008-01-14T04:33:35Z"
    }
  };
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {

    const {users, user, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />

          <div className="container">
            
            <Alert alert={this.state.alert} />
            <Routes>
              <Route
                exact
                path='/'
                //   render={() => (

                Component={() => {
                  return (
                    <Fragment>
                      <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={users && users.length > 0 ? true : false}
                        setAlert={this.setAlert}
                      />
                     
                      <Users loading={loading} users={users} />
                    </Fragment>
                  );
                }}
              />
              <Route exact path="/About" Component={About} />
              <Route
                exact
                path="/user/:login"
                // render={(props) => (
                  // <User
                  //   {...props}
                  //   getUser={this.getUser}
                  //   user={user}
                  //   loading={loading}
                  // />
                // )}
                Component={() => {
                  const username = window.location.pathname.split('/')[2];
                  console.log("HERE", user);
                  return (
                    <User
                    getUser={this.getUser}
                    username={username}
                    user={user}
                    loading={loading}
                  />
                  )
                }}
              />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
