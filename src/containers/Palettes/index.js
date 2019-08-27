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
    // let project_id = this.props.id;
    // try {
    //   const palettes = await fetchPalettes(project_id);
    //   console.log(palettes)
    //   this.setState({ palettes });
    //   if (!this.state.palettes) {
    //     console.log('o well')
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    const palettes = await fetchPalettes(this.props.projectId)
    if (typeof palettes === 'string') {
      this.setState({ palettes: '404' })
    } else {
      this.setState({ palettes })
    }
  }

  togglePaletteGenerator = () => {
    this.props.handleOpenPaletteGenerator()
  }

  handleDeletePalette = e => {
    const id = parseInt(e.target.parentElement.id)
    fetchDeletePalette(id).then(() =>
      this.props.getPalettes(id)
    )
  }

  generatePalettes = () => {
    const { palettes } = this.props;
      if ((palettes[0]!== undefined && palettes[0].error) === 'No palettes under this project') {
        return <p>No palettes found under this project</p>
          
      } else {
        return palettes.map((palette, i) => {
          return (
            <div key={i} id={palette.id} className="palette-container">
              <h4 className="palette-name" >{palette.name}</h4>
              <section className="pal-colors-container">
                <section className="pal-color pal-color-1" style={{background: palette.color_1}} />
                <section className="pal-color pal-color-2" style={{background: palette.color_2}}/>
                <section className="pal-color pal-color-3" style={{background: palette.color_3}}/>
                <section className="pal-color pal-color-4" style={{background: palette.color_4}}/>
                <section className="pal-color pal-color-5" style={{background: palette.color_5}}/>
            </section>
            <button onClick={this.handleDeletePalette}>&#xd7;</button>
            </div>
          )
        })
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

  render() {
    return (
      // <div className="palettes-body">
      //   {this.generatePalettes()}
      //   {(this.props.selectedProject !== 0 && this.props.openPaletteGen === false) && <button onClick={this.togglePaletteGenerator} className="add-palette-btn" >Add new palette</button>}
      // </div>
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