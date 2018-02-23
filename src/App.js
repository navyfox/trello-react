import React, { Component } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Login from "./components/Login/Login";

class App extends Component {
  render() {
    return (
        <div className="ui">
            <nav className="navbar app">App bar</nav>
            <nav className="navbar board">Board bar</nav>
            <Login/>
            <Board/>
        </div>
    );
  }
}

export default App;