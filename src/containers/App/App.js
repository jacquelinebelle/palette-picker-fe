import React, { Component } from 'react';
import Background from '../../components/Background';
import PaletteGenerator from '../PaletteGenerator';
import { setProjects } from '../../actions';
import { getProjects } from '../../api/apiCalls';
import Projects from '../Projects';
import Nav from '../../components/Nav';
import { connect } from 'react-redux';
import './App.scss';

class App extends Component {

  componentDidMount() {
      // this.props.handleSetProjects()
  }

  getUpdatedProject = () => {
    this.props.handleSetProjects()
  }
  
  render() {
    const { colors } = this.props;
    return (
      <div className="app">
        <Nav />
        <PaletteGenerator />
        <Projects getUpdatedProject={this.getUpdatedProject}/>
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
  handleSetProjects: () => getProjects().then(data => dispatch(setProjects(data.projects)))
}) 

export default connect(mapStateToProps, mapDispatchToProps)(App);
