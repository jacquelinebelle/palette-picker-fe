import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Projects.css';
import ProjectForm from '../ProjectForm';
import Palettes from '../Palettes';
import { fetchProjects, fetchDeleteProject } from '../../api/apiCalls';

export class Projects extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      name: ''
    }
  }

  componentDidMount = async () => {
    const projects = await fetchProjects();
    this.setState({ projects })

  }

  getProjects = async () => {
    const projects = await fetchProjects();
    return this.displayProjects(projects)
  }

  displayProjects = () => {
    return this.state.projects.map(project => {
      return (
        <div className="project-container" key={project.id}>
          <Link className="proj-link" exact to={`/projects/${project.id}/palettes`}>
          <h4
            className={`project-name`}>
            {project.name}
          </h4>
        </Link>
          <button onClick={id => this.deleteProject(project.id)} id={project.id} className="delete-project-btn">X</button>
          <Palettes projectId={project.id} />
        </div>
      )
      
    })
  }

  deleteProject = (id) => {
    fetchDeleteProject(id);
    let index = this.state.projects.findIndex(project => project.id === id);
    this.state.projects.splice(index, 1)
    this.setState({ projects: this.state.projects });
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

export default Projects;