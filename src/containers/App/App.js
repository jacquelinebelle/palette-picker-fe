import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Background from '../../components/Background';
import PaletteGenerator from '../PaletteGenerator';
import { setProjects } from '../../actions';
import { getProjects } from '../../api/apiCalls';
import Projects from '../Projects';
import Nav from '../../components/Nav';
import { connect } from 'react-redux';
import './App.scss';

class App extends Component {

  async componentDidMount() {
    const projects = await getProjects();
    console.log(projects.projects)
    this.props.setProjects(projects.projects);
  }

  getUpdatedProject = () => {
    this.props.handleSetProjects()
  }
  
  render() {
    const { colors } = this.props;
    return (
      <div className="app">
        <Nav />
        <Switch>
          <Route exact path='/' render={() => <PaletteGenerator />} />
          <Route exact path='/projects' render={() => <Projects getUpdatedProject={this.getUpdatedProject} />} />
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
  colors: state.colors
});

export const mapDispatchToProps = dispatch => ({
  setProjects: projects => dispatch(setProjects(projects))
}) 

export default connect(mapStateToProps, mapDispatchToProps)(App);
