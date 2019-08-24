import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGeneratedColors } from '../../actions';
import './PaletteGenerator.scss';
var ColorScheme = require('color-scheme');

class PaletteGenerator extends Component {
    constructor() {
        super();
        this.state = {
            color_1: '',
            color_2: '',
            color_3: '',
            color_4: '',
            color_5: '',
        }
    }

    componentDidMount() {
        this.generatePalette();
    }

    generatePalette = () => {
        var hue = Math.floor(Math.random() * 361);
        var scheme = new ColorScheme();
            scheme.from_hue(hue)
            .scheme('tetrade')
            .variation('pastel')
            .web_safe(true);
        var colors = scheme.colors();
        var palette = colors.map(color => '#' + color).slice(10, 15);

        this.setState({ color_1: palette[0], color_2: palette[1], color_3: palette[2], color_4: palette[3], color_5: palette[4] });
        this.props.setGeneratedColors(palette);
    }

    render() {
        return (
            <article className="container">
                <section className="color color-1" style={{background: this.state.color_1}} />
                <section className="color color-2" style={{background: this.state.color_2}}/>
                <section className="color color-3" style={{background: this.state.color_3}}/>
                <section className="color color-4" style={{background: this.state.color_4}}/>
                <section className="color color-5" style={{background: this.state.color_5}}/>
                <button className="generate-btn"
                    onClick={this.generatePalette}
                    >generate
                </button>
            </article>
        )
    }
}

export const mapStateToProps = (state) => ({

});

export const mapDispatchToProps = (dispatch) => ({
    setGeneratedColors: (colors) => dispatch(setGeneratedColors(colors))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaletteGenerator);