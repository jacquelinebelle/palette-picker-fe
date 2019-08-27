import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Projects.css';
import ProjectForm from '../ProjectForm/ProjectForm';
import { fetchDeleteProject } from '../../api/apiCalls';

export class Projects extends Component {

  state = {
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

  displayProjects = () => {
    const { projects } = this.props;
    return projects.map(project => {
      return (
        <div key={project.id} className="project-container">
          <h4 className="project-name">{project.name}</h4>
          {!project.palettes && <p className="no-palettes">No palettes saved to this project yet.</p>}
          <button onClick={this.handleDeleteProject} id={project.id} className="delete-project-btn">&#xd7;</button>
        </div>
      )
    })
  }
  render() {

    return (
      <main className="projects-body">
        <div className="projects-container">
          {this.displayProjects()}
        </div>
          {!this.displayProjects().length && 
            <div className="projects-container">
              <h3 className="no-projects">No projects added yet!</h3>
              <ProjectForm projects={true} />
            </div>
          }
      </main>
    )
  }
}

export const mapStateToProps = state => ({
  projects: state.projects,
  selectedProject: state.selectedProject
})



export default connect(mapStateToProps, null)(Projects)