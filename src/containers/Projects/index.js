import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Projects.css';
import ProjectForm from '../ProjectForm';
import { deleteProject } from '../../api/apiCalls';

class Projects extends Component {

  handleDeleteProject = e => {
    const id = parseInt(e.target.id)
    deleteProject(id).then(() => 
      this.props.getUpdatedProject()
    ) 
  }

  generateProjects = () => {
    const { projects } = this.props;
    return projects.map(project => {
      return (
        <div key={project.id} className="project-container">
          <h4 className="project-name">{project.name}</h4>
          <button onClick={this.handleDeleteProject} id={project.id} className="delete-project-btn">&#xd7;</button>
        </div>
      )
    })
  }
  render() {

    return (
      <main className="projects-body">
        <div className="projects-container">
          {this.generateProjects()}
        </div>
          {!this.generateProjects().length && 
            <div className="projects-container">
              <h3 className="no-projects">No projects added yet!</h3>
              <ProjectForm />
            </div>
          }
      </main>
    )
  }
}

export const mapStateToProps = state => ({
  projects: state.projects
})

export default connect(mapStateToProps)(Projects)