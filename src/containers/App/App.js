import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Background from '../../components/Background';
import PaletteGenerator from '../PaletteGenerator';
import Projects from '../Projects';
import Nav from '../../components/Nav';
import Project from '../Project'
import NotFound from '../../components/NotFound/';
import { connect } from 'react-redux';
import './App.scss';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    }
  }

  render() {
    const { colors } = this.props;
    return (
      <div className="app">
        <Nav />
        <Switch>
          <Route exact path='/' render={() => <PaletteGenerator />} />
          <Route exact path='/404' render={() => <NotFound />} />
          <Route exact path='/projects' render={() => <Projects />} />
          <Route exact path={`/projects/:id/palettes`} render={(id) => <Project id={id.location.pathname} />} />
          <Route exact path={`/projects/palettes/:id`} render={(id) => <PaletteGenerator id={id.location.pathname} history={id.history} />} />
        </Switch>
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
  colors: state.colors,
});

export default connect(mapStateToProps)(App);
