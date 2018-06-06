import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import UserPage from './components/UserPage';
import fire from './components/firebaseInfo';

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
  }

  componentDidMount() {
    this.authListener();
  }

  authListener=()=>{
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    console.log(this.state.user);
    return (
      <div>
        {this.state.user && <UserPage />}
        {this.state.user === null && <LoginForm />}
      </div>
    );
  }
}

export default App;
