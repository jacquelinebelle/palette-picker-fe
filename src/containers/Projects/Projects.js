import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Projects.css';
import ProjectForm from '../ProjectForm/ProjectForm';
import { deleteProject, getPalettes } from '../../api/apiCalls';
import { setPalettes } from '../../actions';

class Projects extends Component {

  state = {
    currentProject: 0,
    hasPalettes: false
  }

  getPalettes = e => {
    const id = parseInt(e.target.parentElement.id);
    this.setState({currentProject: id})
    getPalettes(id).then(data => {
      if (data[0].error === 'Cannot find palettes under this project') {
        this.setState({hasPalettes: false})
        this.props.handleSetPalettes([{error: 'No palettes under this project'}])
      } else {
        this.setState({hasPalettes: true})
        console.log(data)
        this.props.handleSetPalettes(data)
      }
    })
  }

  handleDeleteProject = e => {
    const id = parseInt(e.target.parentElement.id)
    deleteProject(id).then(() => 
      this.props.getUpdatedProject()
    ) 
  }

  generateProjects = () => {
    const { projects } = this.props;
    return projects.map(project => {
      return (
        <div key={project.id} id={project.id} className="project-container">
          <h4 className="project-name" onClick={this.getPalettes}>{project.name}</h4>
          <button onClick={this.handleDeleteProject} className="delete-project-btn">&#xd7;</button>
        </div>
      )
    })
  }
  render() {

    return (
      <div className="projects-body">
        <div className="projects-container">
          <h3 className="project-title">Projects</h3>
        {this.generateProjects()}
        <ProjectForm getUpdatedProject={this.props.getUpdatedProject}/> 
        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  projects: state.projects
})

export const mapDispatchToProps = dispatch => ({
  handleSetPalettes: palettes => dispatch(setPalettes(palettes))
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects)