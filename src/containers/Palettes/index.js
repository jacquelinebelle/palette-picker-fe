import React, { Component } from 'react';
import './Palettes.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openPaletteGenerator } from '../../actions';
import { fetchPalettes, fetchDeletePalette, fetchPatchPalette } from '../../api/apiCalls';

export class Palettes extends Component {
  constructor() {
    super();
    this.state = {
      palettes: [],
      name: '',
      input: false
    }
  }

  componentDidMount = async () => {
    console.log(this.props.projectId)
    const palettes = await fetchPalettes(this.props.projectId)
    if (typeof palettes === 'string') {
      this.setState({ palettes: '404' })
    } else {
      this.setState({ palettes })
    }
  }

  changeState = () => {
    this.setState({ input: true });
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value })
  }

  updatePalette = (e, id) => {
    let update = { name: this.state.name }
    if (e.keyCode === 13) {
      fetchPatchPalette(id, update);
      let index = this.state.palettes.findIndex(palette => palette.id === id);
      this.state.palettes[index].name = this.state.name;
      this.setState({ input: false })
    }
  }

  displayPalettes =  () => {
    const { palettes } = this.state;
    if (typeof palettes !== 'string') {
      return palettes.map(pal => {
        return (
        
            <Link className="pal-link" exact to={`/projects/palettes/${pal.id}`} key={pal.id}>
              <h5 
                className={`${!this.state.input}-pal-name palette-name`}
                onClick={this.changeState}>
                {pal.name}
              </h5>
              <input 
                className={`${this.state.input}-pal-input`}
                type="text"
                onChange={this.handleChange}
                onKeyUp={(e, id) => this.updatePalette(e, pal.id)}
                placeholder={pal.name}
              />
              <div className="palette-container">
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
            </Link>
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