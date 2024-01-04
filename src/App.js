import React from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import Home from './components/pages/Home';
import NotFound from "./components/pages/NotFound";

const App =() =>{


    return (
      <GithubState>
        <AlertState>
        <Router>
        <div className="App">
          <Navbar />

          <div className="container">
            
            <Alert />
            <Routes>
              <Route exact  path='/' Component={Home}/>
              <Route exact path="/About" Component={About} />
              <Route
                exact
                path="/user/:login"
                Component={() => {
                  const username = window.location.pathname.split('/')[2];
                  
                  return (
                    <User
                    username={username}
                  />
                  )
                }}
                // Component={User}
              
              />
              <Route Component={NotFound}/>
            </Routes>
          </div>
        </div>
      </Router>
      </AlertState>
  </GithubState>
    
    );
  
};


export default App;
