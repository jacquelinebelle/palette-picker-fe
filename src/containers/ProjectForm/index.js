import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        const name = `name=${this.state.name}`;
        addProject(name);
    }

    render() {
        return (
            <form className="project-form">
                <input
                    className="project-name-input"
                    type="text"
                    name="name"
                    placeholder="enter project name"
                    onChange={this.handleChange} />
                <button className="submit-project" onClick={this.handleSubmit}>make project</button>
            </form>
        )
    }
}

export default ProjectForm;