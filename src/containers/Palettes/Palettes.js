import React, { Component } from 'react';
import './Palettes.css';
import { connect } from 'react-redux';
import { openPaletteGenerator } from '../../actions';
import { fetchDeletePalette } from '../../api/apiCalls';

export class Palettes extends Component {

  togglePaletteGenerator = e => {
    const paletteName = e.target.id
    const paletteActionType = e.target.name;
    const id = parseInt(e.target.parentElement.id)
    this.props.handleOpenPaletteGenerator(paletteActionType, id, paletteName)
  }

  handleDeletePalette = e => {
    const id = parseInt(e.target.parentElement.id)
    const projectId = parseInt(e.target.id)
    fetchDeletePalette(id)
    .then(() =>
      this.props.handleFetchPalettes(projectId)
    )
  }

  generatePalettes = () => {
    const { palettes } = this.props;
      if ((palettes[0]!== undefined && palettes[0].error) === 'No palettes under this project') {
        return <p className="no-palletes">No palettes found under this project</p>
          
      } else {
        return palettes.map((palette, i) => {
          return (
            <div key={i} id={palette.id} className="palette-container">
              <button onClick={this.handleDeletePalette} className="delete-palette-btn" id={palette.project_id}>&#xd7;</button>
              <button onClick={this.togglePaletteGenerator} name="Update" className="edit-palette-btn" id={palette.name}></button>
              <h4 className="palette-name" >{palette.name}</h4>
              <section className="pal-colors-container">
                <section className="pal-color pal-color-1" style={{background: palette.color_1}} >{palette.color_1}</section>
                <section className="pal-color pal-color-2" style={{background: palette.color_2}}>{palette.color_2}</section>
                <section className="pal-color pal-color-3" style={{background: palette.color_3}}>{palette.color_3}</section>
                <section className="pal-color pal-color-4" style={{background: palette.color_4}}>{palette.color_4}</section>
                <section className="pal-color pal-color-5" style={{background: palette.color_5}}>{palette.color_5}</section>
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
        {(this.props.selectedProject !== 0 && this.props.openPaletteGen.open === false) && <button onClick={this.togglePaletteGenerator} name="Add" className="add-palette-btn">Add new palette</button>}
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
  handleOpenPaletteGenerator: (paletteActionType, id, palleteName) => dispatch(openPaletteGenerator(paletteActionType, id, palleteName))
})
export default connect(mapStateToProps, mapDispatchToProps)(Palettes);