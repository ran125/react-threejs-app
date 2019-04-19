import React, { Component } from 'react';
import ThreeCube from './threejs/ThreeCube/ThreeCube'
import Menu from './Menu/menu.jsx'
import Menu2 from './Menu/menu2.jsx'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <ThreeCube/>
        <Menu/>
        <Menu2/>
      </div>
    );
  }
}

export default App;
