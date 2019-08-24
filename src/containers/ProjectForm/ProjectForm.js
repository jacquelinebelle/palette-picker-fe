import React, { Component } from 'react';
import { addProject } from '../../api/apiCalls';
import './ProjectForm.scss';

class ProjectForm extends Component {
    constructor() {
        super();
        this.state = {
            name: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const name = this.state.name;
        addProject(name).then(() => 
            this.props.getUpdatedProject()
        )
        this.clearInput()
    }

    clearInput = () => {
        this.setState({name: ""})
    }

    render() {
        return (
            <form className="project-form">
                <input
                    className="project-name-input"
                    type="text"
                    name="name"
                    placeholder="Add new project"
                    maxLength="20"
                    value={this.state.name}
                    onChange={this.handleChange} />
                <button className="submit-project" onClick={this.handleSubmit}>&#43;</button>
            </form>
        )
    }
}

export default ProjectForm;