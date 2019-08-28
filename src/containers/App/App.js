import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Background from '../../components/Background';
import PaletteGenerator from '../PaletteGenerator';
import { setProjects } from '../../actions';
import Projects from '../Projects';
import Nav from '../../components/Nav';
import { fetchProjects } from '../../api/apiCalls';
import Palettes from '../Palettes';
import Project from '../Project'
import { connect } from 'react-redux';
import './App.scss';
import {projectSelected, setPalettes } from '../../actions';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    }
  }

  // getUpdatedProject = () => {
  //   this.props.handleSetProjects();
  //   // this.handleFetchPalettes()
  // }

  // addPalette = name => {
  //   const {colors, selectedProject} = this.props;
  //   const newPalette = {
  //     name,
  //     color_1: colors[0],
  //     color_2: colors[1],
  //     color_3: colors[2],
  //     color_4: colors[3],
  //     color_5: colors[4],
  //   }
  //   fetchAddPalette(selectedProject, newPalette).then(() =>
  //     this.getPalettes(selectedProject)
  //   )
  // }

  // getPalettes = id => {
  //   this.setState({currentProject: id})
  //   this.props.handleProjectSelected(id)
  //   this.handleFetchPalettes(id)
  // }

  // handleFetchPalettes = (id) => {
  //   fetchPalettes(id).then(data => {

  //     if (data === 'Cannot fetch palettes') {
  //       this.setState({hasPalettes: false})
  //       this.props.handleSetPalettes([{error: 'No palettes under this project'}])
  //     } else {
  //       this.setState({hasPalettes: true})
  //       this.props.handleSetPalettes(data)
  //     }
  //   })
  // }
  
  render() {
    const { colors } = this.props;
    return (
      <div className="app">
        <Nav />
        <Switch>
          <Route exact path='/' render={() => <PaletteGenerator />} />
          <Route exact path='/projects' render={() => <Projects />} />
          <Route exact path={`/projects/:id/palettes`} render={(id) => <Project id={id.location.pathname} />} />
          <Route exact path={`/projects/palettes/:id`} render={(id) => <PaletteGenerator id={id.location.pathname} />} />
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


// export const mapStateToProps = (state) => ({
//   colors: state.colors,
//   selectedProject: state.selectedProject
// });

// export const mapDispatchToProps = dispatch => ({
//   // setProjects: projects => dispatch(setProjects(projects)),

// }) 

// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;