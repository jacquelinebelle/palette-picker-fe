import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProject, fetchPalettes } from '../../api/apiCalls';
import './Project.scss';

class Project extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            palettes: []
        }
    }

    async componentDidMount() {
        const id = this.props.id.split('/')[2]
        const project = await fetchProject(id)
        const palettes = await fetchPalettes(id)
        this.setState({ name: project.name, palettes })
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
        return (
            <article className="single-project">
                <h3 className="single-proj-name">{this.state.name}</h3>
                {this.displayPalettes()}
            </article>
        )
    }
}

export const mapStateToProps = (state) => ({
    // colors: state.colors
});

export default connect(mapStateToProps)(Project);