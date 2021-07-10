import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import { Alert } from './components/layout/Alert';
import About from './components/pages/About';

import './App.css';

class App extends React.Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  }

  // async componentDidMount() {
  //   this.state.loading = true;
  //   this.setState({ loading: true });
    
  //   const res = await fetch(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   const data = await res.json();

  //   this.setState({ users: data, loading: false });
  // }

  // Search users in githib repository
  searchUsers = async (text) => {
    this.state.loading = true;

    const res = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const data = await res.json();
    
    this.setState({ users: data.items, loading: false });
  }

  // Get single user data
  getUser = async (username) => {
    this.state.loading = true;

    const res = await fetch(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const data = await res.json();
    
    this.setState({ user: data, loading: false });
  }

  // Get user repos
  getUserRepos = async (username) => {
    this.state.loading = true;

    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const data = await res.json();
    
    this.setState({ repos: data, loading: false });
  }
  // clear users list from the page(UI)
  clearUsers = () => this.setState({ users: [], loading: false,})

  setAlert = (msg, type) => {
    this.setState({ alert: {msg: msg, type: type}});

    setTimeout(() => this.setState({alert: null}), 5000);
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" 
              render={ props => (
                <React.Fragment>
                  <Search 
                  searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  showClear={this.state.users.length > 0 ? true: false}
                  setAlert={this.setAlert}
                  />
                  <Users users={this.state.users} loading={this.state.loading}/>
                </React.Fragment>
              )}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={props => (
                <User { ...props} 
                getUser={this.getUser} 
                getUserRepos={this.getUserRepos} 
                repos={this.state.repos}
                user={this.state.user} 
                loading={this.state.loading} />
              )} />
            </Switch>
            <Alert alert={this.state.alert} />
            
          </div>
      </div>
    </Router>
    );
    }
}

export default App;
