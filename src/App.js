import React, { Fragment, useState } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App =() =>{
  const [users,setUsers]=useState([]);
  const [user,setUser]=useState({});
  const [repos,setRepos]=useState([]);
  const [loading,setLoading]=useState(false);
  const [alert,setAlert]=useState(null);
   
  ;

  // async componentDidMount(){
  //   this.setState({loading:true});
  //   const res= axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({users:(await res).data, loading:false});
  // }

  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
   
    setUsers(res.data.items);
    setLoading(false);
  };
  //get single github user
  const getUser = async (username) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUser(res.data);
      setLoading(false);
    
    } catch (error) {
      console.log("API FAILED ", error)
    }
  };
  //get user repos
  const getUserRepos = async (username) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      //console.log("HEREEEE ", res.data)
    setRepos(res.data);
    setLoading(false);
    } catch (error) {
      console.log("API FAILED ", error)
    }
  };

  //clear users from state
 const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  //set alert
  const showAlert = (msg, type) => {
    setAlert({msg,type});
    setTimeout(() => setAlert(null),5000);
  };

  

   // const {users, user,repos, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />

          <div className="container">
            
            <Alert alert={alert} />
            <Routes>
              <Route
                exact
                path='/'
                //   render={() => (

                Component={() => {
                  return (
                    <Fragment>
                      <Search
                        searchUsers={searchUsers}
                        clearUsers={clearUsers}
                        showClear={users && users.length > 0 ? true : false}
                        setAlert={showAlert}
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
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    repos={repos }
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


export default App;
