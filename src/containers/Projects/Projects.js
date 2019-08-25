import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Projects.css';
import ProjectForm from '../ProjectForm/ProjectForm';
import { fetchDeleteProject } from '../../api/apiCalls';

class Projects extends Component {

  state = {
    currentProject: 0,
    hasPalettes: false
  }

  handleGetPalettes = e => {
    const id = parseInt(e.target.parentElement.id);
    this.props.getPalettes(id)
  }

  handleDeleteProject = e => {
    const id = parseInt(e.target.parentElement.id)
    fetchDeleteProject(id).then(() => 
      this.props.getUpdatedProject()
    ) 
  }



  generateProjects = () => {
    const  {projects}  = this.props;
    const { currentProject } = this.state;
    return projects.map(project => {
      const selectedstyle = (project.id === currentProject) ? {background: '#385894'} : null

      return (
        <div key={project.id} id={project.id} className="project-container">
          <h4 className="project-name" style={selectedstyle} onClick={this.handleGetPalettes}>{project.name}</h4>
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



export default connect(mapStateToProps)(Projects)