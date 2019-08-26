import React, { Component } from 'react';
import { addProject } from '../../api/apiCalls';
import './ProjectForm.scss';

class ProjectForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            select: false
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e, input) => {
        e.preventDefault();
        console.log(e)
        const name = this.state.name;
        if (input === 'project') {
            addProject(name).then(() => 
                this.props.getUpdatedProject()
            )

        } else if (input === 'palette') {

        } else if (input === 'select-project')
        this.clearInput()
    }

    // handlePaletteSubmit = (e) => {
    //     e.preventDefault();
    //     const name = this.state.name;

    // }

    selectProject = (e) => {

    }

    handleKeyUp = (e, input) => {
        if (e.keyCode === 13) {
            this.handleSubmit(e, input);
        } 
    }

    clearInput = () => {
        this.setState({name: ""})
    }

    render() {
        return (
            <form className={this.props.projects ? `project-page-form` : `project-form`}>
                <div className={this.props.projects ? `project-page-add` : `add-project`}>
                    <input 
                        className={`project-input`}
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp(this.target, 'project')}
                        placeholder="START PROJECT"
                    />
                    <button className={`add-project-btn`} onClick={this.handleSubmit(this.target, 'project')}>
                        +
                    </button>
                </div>
                <div className={this.props.projects ? `project-page-save` : `save-palette`}>
                    { !this.state.select &&
                        <input 
                            className={`palette-input`}
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyUp(this.target, 'palette')}
                            placeholder="PALETTE NAME"
                        />
                    }
                    { this.state.select &&
                        <select className={`project-dropdown`}>
                        <option value="">PROJECT</option>
                        <option value="example">project example</option>
                        </select>
                    }
                    <button className={`save-palette-btn`}          onClick={this.handleSubmit()}
                        onKeyUp={this.handleKeyUp(this.target, 'select-project')}>
                        +
                    </button>
                </div>
            </form>
        )
    }
}

export default ProjectForm;