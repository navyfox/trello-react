import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import List from './components/List/List';

class App extends Component {
  render() {
    return (
        <div className="ui">
            <nav className="navbar app">App bar</nav>
            <nav className="navbar board">Board bar</nav>
            <div className="lists">
                <List title='List header'/>
            </div>
        </div>
    );
  }
}

export default App;
