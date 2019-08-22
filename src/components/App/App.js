import React, { Component } from 'react';
import Background from '../Background';
import PaletteGenerator from '../PaletteGenerator';
import { connect } from 'react-redux';
import './App.scss';

class App extends Component {
  
  render() {
    const { colors } = this.props;
    return (
      <div className="app">
        <header>
          <h1>Palette Picker</h1>
        </header>
        <PaletteGenerator />
        <Background 
          color_1={colors[0]}
          color_2={colors[1]}
          color_3={colors[2]}
          color_4={colors[3]}
          color_5={colors[4]} />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  colors: state.colors
});

export default connect(mapStateToProps)(App);
