import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Projects.css';
import ProjectForm from '../ProjectForm';
import Palettes from '../Palettes';
import { fetchProjects, fetchDeleteProject, fetchPatchProject } from '../../api/apiCalls';

export class Projects extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      name: '',
      input: false
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

  handleChange = (e) => {
    this.setState({ name: e.target.value })
  }

  updateProjectName = (e, id) => {
    let update = { name: this.state.name }
    if (e.keyCode === 13) {
      fetchPatchProject(id, update);
      let index = this.state.projects.findIndex(project => project.id === id);
      this.state.projects[index].name = this.state.name;
      this.setState({ input: false })
    }
  }

  changeState = () => {
    this.setState({ input: true });
  }

  displayProjects = () => {
    return this.state.projects.map(project => {
      return (
        <div className="project-container" key={project.id}>
          <Link className="proj-link" exact to={`/projects/${project.id}/palettes`}>
          <h4
            className={`${!this.state.input}-name project-name`}
            onClick={this.changeState}>
            {project.name}
          </h4>
          <input 
            className={`${this.state.input}-input`}
            type="text"
            onChange={this.handleChange}
            onKeyUp={(e, id) => this.updateProjectName(e, project.id)}
            placeholder={project.name}
          />
          <button onClick={id => this.deleteProject(project.id)} id={project.id} className="delete-project-btn">X</button>
        </Link>
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

export const mapStateToProps = state => ({
  projects: state.projects,
  selectedProject: state.selectedProject
})



export default connect(mapStateToProps)(Projects)