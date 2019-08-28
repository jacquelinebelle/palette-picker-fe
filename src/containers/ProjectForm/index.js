import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAddProject, fetchProjects, fetchAddPalette } from '../../api/apiCalls';
import { flipSelect } from '../../actions';
import arrow from '../../assets/arrow.svg';
import './ProjectForm.scss';

class ProjectForm extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            name: '',
            select: false
        }
    }

    componentDidMount = async () => {
        const projects = await fetchProjects();
        this.setState({ projects })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e, input) => {
        e.preventDefault();
        this.clearInput(e)
        if (input === 'project') {
            const name = this.state.name;
            this.checkName(name)
        } else if (input === 'palette') {
            this.setState({ select: true })
            this.props.flipSelect(true);
        } 
    }

    checkName = (name) => {
        const what = this.state.projects.find(proj => proj.name === name)
        if (what !== undefined) {
            this.setState({ nameError: true })
        } else {
            this.clearInput()
            fetchAddProject(name)
        }

    }

    savePalette = async (e) => {
        let { colors } = this.props;
        let id = e.target.value;
        let palette = {
            name: this.state.name,
            color_1: colors[0],
            color_2: colors[1],
            color_3: colors[2],
            color_4: colors[3],
            color_5: colors[4]
        }

        await fetchAddPalette(id, palette);
        this.setState({ select: false });
        this.props.flipSelect(false);
    }

    handleKeyUp = (e, input) => {
        if (e.keyCode === 13) {
            this.handleSubmit(e, input);
        } 
    }

    clearInput = (e) => {
        if (e !== undefined) {
            e.target.value = '';
            e.target.parentNode.firstChild.value = '';
        }
    }

    getProjectOptions = () => {
        return this.state.projects.map(project => {
            return ( 
                <option key={`option${project.id}`} value={project.id}>{project.name}</option>
            )
        })
    }

    render() {
        return (
            <form className={`${this.state.select} ${this.props.projects ? `project-page-form` : `project-form`}`}>
                <div className={this.props.projects ? `project-page-add` : `add-project`}>
                    <input 
                        className={`project-input`}
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                        onKeyUp={e => this.handleKeyUp(e, 'project')}
                        placeholder={this.state.nameError ? "CHOOSE UNIQUE NAME" : "START PROJECT"}
                    />
                    <button className={`add-project-btn`} onClick={e => this.handleSubmit(e, 'project')}>
                        +
                    </button>
                </div>
                
                    
                      
                            {!this.state.select && 
                           <div className={`${this.state.select} ${this.props.projects ? `project-page-save` : `save-palette`}`}>
                            <input 
                                className={`palette-input`}
                                type="text"
                                name="name"
                                onChange={this.handleChange}
                                onKeyUp={e => this.handleKeyUp(e, 'palette')}
                                placeholder="PALETTE NAME"
                            />
                            <button 
                                className={`save-palette-btn`}   onClick={e => this.handleSubmit(e, 'palette')}
                                onKeyUp={e => this.handleKeyUp(e, 'select-project')}>
                                    +
                            </button>
                        </div>}
                   {this.state.select && <h4 className="choose-prompt">Choose a project for your palette :)</h4>}
                    
                    { this.state.select &&
                        <div className="dropdown-container">
                            <select className={`project-dropdown`}
                            onChange={this.savePalette}
                            >
                                <option value="">CLICK TO SELECT PROJECT</option>
                                {this.getProjectOptions()}
                            </select>
                            <img className="arrow" src={arrow} />
                        </div>
                    }
            </form>
        )
    }
}

export const mapStateToProps = (state) => ({
    colors: state.colors,
    selectedProject: state.selectedProject
  });

export const mapDispatchToProps = (dispatch) => ({
  flipSelect: (bool) => dispatch(flipSelect(bool))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);