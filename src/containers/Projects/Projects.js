import React, { Component } from 'react'
import { connect } from 'react-redux';

class Projects extends Component {

  generateProjects = () => {
    const { projects } = this.props;
    const project = projects.map(project => {
      return (
        <h4>{project.name}</h4>
      )
    })
    return project
  }
  render() {
    const { projects } = this.props;
let project = projects.map(project => {
  return (
    <h4>{project.name}</h4>
  )
})
    return (
      <div>
        {this.generateProjects}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  projects: state.projects
})

export default connect(mapStateToProps)(Projects)