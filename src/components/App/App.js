import React from 'react';
import Background from '../Background';
import PaletteGenerator from '../PaletteGenerator';
import './App.scss';

function App() {
  return (
    <div className="app">
      <header>
        <h1 className="main-heading">palette picker</h1>
      </header>
      <PaletteGenerator />
      <Background />
    </div>
  );
}

export default App;
