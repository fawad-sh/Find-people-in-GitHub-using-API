import React from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import { Alert } from './components/layout/Alert';
import './App.css';

class App extends React.Component {
  state = {
    users: [],
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
    console.log(data);
    this.setState({ users: data.items, loading: false });
  }

  // clear users list from the page(UI)
  clearUsers = () => this.setState({ users: [], loading: false,})

  setAlert = (msg, type) => {
    this.setState({ alert: {msg: msg, type: type}});

    setTimeout(() => this.setState({alert: null}), 5000);
  }
  
  render() {
    return (
      <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Search 
            searchUsers={this.searchUsers} 
            clearUsers={this.clearUsers} 
            showClear={this.state.users.length > 0 ? true: false}
            setAlert={this.setAlert}
            />
            <Users users={this.state.users} loading={this.state.loading}/>
          </div>
      </div>
    );
    }
}

export default App;
