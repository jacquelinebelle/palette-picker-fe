import React, { Component } from 'react';
import './Palettes.css';
import { connect } from 'react-redux';
import { openPaletteGenerator } from '../../actions';

class Palettes extends Component {

  togglePaletteGenerator = () => {
    this.props.handleOpenPaletteGenerator()
  }

  generatePalettes = () => {
    const { palettes } = this.props;
      if ((palettes[0]!== undefined && palettes[0].error) === 'No palettes under this project') {
        return <p>No palettes found under this project</p>
          
      } else {
        return palettes.map(palette => {
          return (
            <div key={palette.id} id={palette.id} className="palette-container">
              <h4 className="palette-name">{palette.name}</h4>
              <section className="pal-colors-container">
                <section className="pal-color pal-color-1" style={{background: palette.color_1}} />
                <section className="pal-color pal-color-2" style={{background: palette.color_2}}/>
                <section className="pal-color pal-color-3" style={{background: palette.color_3}}/>
                <section className="pal-color pal-color-4" style={{background: palette.color_4}}/>
                <section className="pal-color pal-color-5" style={{background: palette.color_5}}/>
            </section>
            </div>
          )
        })
      }
  }

  render() {
    return (
      <div className="palettes-body">
        {this.generatePalettes()}
        {(this.props.selectedProject !== 0 && this.props.openPaletteGen === false) && <button onClick={this.togglePaletteGenerator} className="add-palette-btn" >Add new palette</button>}
      </div>
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