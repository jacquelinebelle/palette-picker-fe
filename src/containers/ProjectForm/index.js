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
        const name = this.state.name;
        if (input === 'project') {
            fetchAddProject(name)
            this.clearInput()
        } else if (input === 'palette') {
            this.setState({ select: true })
            this.props.flipSelect(true);
        } else if (input === 'select-project') {
            console.log('beep');
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

    clearInput = () => {
        this.setState({name: ""})
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
                        placeholder="START PROJECT"
                    />
                    <button className={`add-project-btn`} onClick={e => this.handleSubmit(e, 'project')}>
                        +
                    </button>
                </div>
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
                </div>
                   
                    
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