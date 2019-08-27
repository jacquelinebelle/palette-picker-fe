import React, { Component } from 'react';
import './Palettes.css';
import { connect } from 'react-redux';
import { openPaletteGenerator } from '../../actions';
import { fetchPalettes, fetchDeletePalette } from '../../api/apiCalls';

export class Palettes extends Component {
  constructor() {
    super();
    this.state = {
      palettes: []
    }
  }

  componentDidMount = async () => {
    const palettes = await fetchPalettes(this.props.projectId)
    if (typeof palettes === 'string') {
      this.setState({ palettes: '404' })
    } else {
      this.setState({ palettes })
    }
  }

  displayPalettes =  () => {
    const { palettes } = this.state;
    if (typeof palettes !== 'string') {
      return palettes.map(pal => {
        return (
            <>
              <h5 className="palette-name">{pal.name}</h5>
              <div className="palette-container" key={pal.id}>
                <button 
                  className="delete-palette-btn" 
                  onClick={id => this.deletePalette(pal.id)}>
                    x
                </button>
                <div className="pal-color" style={{background: pal.color_1}} />
                <div className="pal-color" style={{background: pal.color_2}} />
                <div className="pal-color" style={{background: pal.color_3}} />
                <div className="pal-color" style={{background: pal.color_4}} />
                <div className="pal-color" style={{background: pal.color_5}} />
              </div>
            </>
        )
      })
    } else {
      return <p className="no-palettes">No palettes saved to this project yet.</p>
    }
  }

  deletePalette = (id) => {
    fetchDeletePalette(id);
    let index = this.state.palettes.findIndex(palette => palette.id === id);
    this.state.palettes.splice(index, 1)
    this.setState({ palettes: this.state.palettes });
  }

  render() {
    return (
      <section className="palettes-section">
        {this.displayPalettes()}
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  palettes: state.palettes,
  selectedProject: state.selectedProject,
  openPaletteGen: state.openPaletteGen
})

export const mapDispatchToProps = dispatch => ({
  handleOpenPaletteGenerator: () => dispatch(openPaletteGenerator())
})
export default connect(mapStateToProps, mapDispatchToProps)(Palettes);