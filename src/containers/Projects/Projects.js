import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Projects.css';
import ProjectForm from '../ProjectForm/ProjectForm';

class Projects extends Component {

  generateProjects = () => {
    const { projects } = this.props;
    return projects.map(project => {
      return (
        <div key={project.id} className="project-container">
          <h4 className="project-name">{project.name}</h4>
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
        <ProjectForm /> 
        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  projects: state.projects
})

export default connect(mapStateToProps)(Projects)