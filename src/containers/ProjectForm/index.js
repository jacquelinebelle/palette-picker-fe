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

    handlePaletteSubmit = (e) => {
        e.preventDefault();
        const name = this.state.name;

    }

    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.handleSubmit(e);
        }
    }

    clearInput = () => {
        this.setState({name: ""})
    }

    render() {
        return (
            <form className="project-form">
                <div className="add-project">
                    <input 
                        className="project-input"
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp}
                        placeholder="START PROJECT"
                    />
                    <button className="add-project-btn" onClick={this.handleSubmit}>
                        +
                    </button>
                </div>
                <div className="save-palette">
                    {/* <select className="project-dropdown">
                        <option value="">PROJECT</option>
                        <option value="example">project example</option>
                    </select> */}
                    <input 
                        className="palette-input"
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp}
                        placeholder="PALETTE NAME"
                    />
                    <button className="save-palette-btn" onClick={this.handleSubmit}>
                        +
                    </button>
                </div>
            </form>
        )
    }
}

export default ProjectForm;