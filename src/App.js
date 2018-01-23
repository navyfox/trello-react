import React, { Component } from 'react';
import './App.css';
import Board from './components/Board/Board';

class App extends Component {
  render() {
    return (
        <div className="ui">
            <nav className="navbar app">App bar</nav>
            <nav className="navbar board">Board bar</nav>
            <Board/>
        </div>
    );
  }
}

export default App;
