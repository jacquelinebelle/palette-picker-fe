import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectForm from '../ProjectForm';
import { setGeneratedColors } from '../../actions';
import { fetchPalette } from '../../api/apiCalls';
import generate from '../../assets/generate.svg'
import lock from '../../assets/lock.svg'
import './PaletteGenerator.scss';
var ColorScheme = require('color-scheme');

export class PaletteGenerator extends Component {
    constructor() {
        super();
        this.state = {
            color_1: '',
            color_2: '',
            color_3: '',
            color_4: '',
            color_5: '',
            name: ''
        }
    }

    
// /color_1: "#ffcccc"
// color_2: "#cc3333"
// color_3: "#66cc66"
// color_4: "#339933"
// color_5: "#ccffcc"
// created_at: "2019-08-28T01:02:48.244Z"
// id: 21
// name: "watermelon"
// project_id: 15
// updated_at: "2019-08-28T01:02:48.244Z"

    async componentDidMount() {
        if (this.props.id === undefined) {
            this.generatePalette();
        } else {
            const id = this.props.id.split('/')[3]
            const palette = await fetchPalette(id);
            this.getSpecifiedPalette(palette[0]);
            
        }
    }
    
    getSpecifiedPalette = (palette) => {
        // objectkeys? foreach
        // if typeof key[7] === number || === 'name
        // setstate key: state[key]
        // uncomment out call in cdm
        Object.keys(palette).forEach(key => {
            if (key.length === 7 || key === 'name' ) {
                this.setState({ [key]: palette[key] })
            }
        })

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

        Object.keys(this.state).forEach((key, index) => {
            if (key !== 'name' && this.state[key][0] !== 'l') {
                this.setState({ [key]: palette[index] })
            }
        })

        this.props.setGeneratedColors(palette)
    }

    togglePaletteGenerator = () => {
        this.props.handleOpenPaletteGenerator()
      }

    handleOnChange = e => {
        this.setState({name: e.target.value});
        
    }

    submitNewPalette = () => {
        const { name } = this.state
        this.props.addPalette(name)
        this.props.handleOpenPaletteGenerator()
        this.clearInput()
    }

    clearInput = () => {
        this.setState({name: ""})
    }

    lockColor = (e, num, color) => {
        let lockedColor = `color_${num}`
        if (e.target.className === 'locked') {
            let unlocked = this.state[lockedColor].split('-')[1]
            this.state[lockedColor] = unlocked;
            e.target.className = "lock"
        } else {
            e.target.className = "locked"
            let lockedState = `locked-${this.state[lockedColor]}`
            this.state[lockedColor] = lockedState;
        }
    }

    render() {
        const { color_1, color_2, color_3, color_4, color_5} = this.state;
        return (
            <article className={`${this.props.select}-container container`}>
                <section className="color color-1" style={{background: color_1}}>
                    <button 
                        className={`freeze-color`}

                        style={{background: color_1}}
                        onClick={(e, num, color) => this.lockColor(e, 1, color_1)}>
                        <img className="lock" src={lock} />
                    </button>
                </section>
                <section className="color color-2" style={{background: color_2}}>
                    <button 
                        className="freeze-color" 
                        style={{background: color_2}}
                        onClick={(e, num, color) => this.lockColor(e, 2, color_2)}>
                        <img className="lock" src={lock} />
                    </button>
                </section>
                <section className="color color-3" style={{background: color_3}}>
                    <button 
                        className="freeze-color" 
                        style={{background: color_3}}
                        onClick={(e, num, color) => this.lockColor(e, 3, color_3)}>
                        <img className="lock" src={lock} />
                    </button>
                </section>
                <section className="color color-4" style={{background: color_4}}>
                    <button 
                        className="freeze-color" 
                        style={{background: color_4}}
                        onClick={(e, num, color) => this.lockColor(e, 4, color_4)}>
                        <img className="lock" src={lock} />
                    </button>
                </section>
                <section className="color color-5" style={{background: color_5}}>
                    <button 
                        className="freeze-color" 
                        style={{background: color_5}}
                        onClick={(e, num, color) => this.lockColor(e, 5, color_5)}>
                        <img className="lock" src={lock} />
                    </button>
                </section>
                <ProjectForm />
                <button className="generate-btn"
                    onClick={this.generatePalette}>
                    <img className="generate-icon" src={generate} />
                </button>
            </article>
        )
    }
}

export const mapStateToProps = state => ({
    openPaletteGen: state.openPaletteGen,
    select: state.select
});

export const mapDispatchToProps = (dispatch) => ({
    setGeneratedColors: colors => dispatch(setGeneratedColors(colors))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaletteGenerator);