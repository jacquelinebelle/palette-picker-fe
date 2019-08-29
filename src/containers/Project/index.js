import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProject, fetchPalettes, fetchPatchProject } from '../../api/apiCalls';
import './Project.scss';

export class Project extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            palettes: [],
            empty: false,
            input: false
        }
    }

    async componentDidMount() {
        const id = this.props.id.split('/')[2]
        const project = await fetchProject(id)
        const palettes = await fetchPalettes(id)
        if (typeof palettes === 'string') {
            this.setState({ id:id, name: project.name, empty: true })
        } else {
            this.setState({ id: id, name: project.name, palettes })
        }

    }

    handleChange = (e) => {
        this.setState({name: e.target.value});
    }

    updateProjectName = (e, id) => {
        let update = { name: this.state.name }
        if (e.keyCode === 13) {
            fetchPatchProject(id, update);
            this.changeState();
        }
    }

    changeState = () => {
        this.setState({ input: !this.state.input });
    }

    displayPalettes = () => {
        return this.state.palettes.map(pal => {
           return <>
            <h3 className="proj-pal-name">{pal.name}</h3>
                <div className="proj-pal-container" key={pal.id}>
                    <div className="proj-color proj-color1" style={{background: pal.color_1}} />
                    <div className="proj-color proj-color2" style={{background: pal.color_2}} />
                    <div className="proj-color proj-color3" style={{background: pal.color_3}} />
                    <div className="proj-color proj-color4" style={{background: pal.color_4}} />
                    <div className="proj-color proj-color5" style={{background: pal.color_5}} />
                </div>
            </>
        })
    }

    render() {
        const { name, empty } = this.state;
        return (
            <article className={`${empty}  single-project`}>
                <h3 
                    className={`${!this.state.input}-name single-proj-name`}
                    onClick={this.changeState}>                 {name}
                </h3>
                <input 
                    className={`${this.state.input}-input`}
                    type="text"
                    onChange={this.handleChange}
                    onKeyUp={(e, id) => this.updateProjectName(e, this.state.id)}
                    placeholder={name}
                />
                {!empty && this.displayPalettes()}
                {empty && <p className="empty">No palettes yet :)</p>}
            </article>
        )
    }
}

export default Project ;