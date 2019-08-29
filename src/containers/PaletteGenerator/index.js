import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectForm from '../ProjectForm';
import { setGeneratedColors } from '../../actions';
import { fetchPalette, fetchPatchPalette } from '../../api/apiCalls';
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
            name: '',
            specified: false,
            input: false
        }
    }

    async componentDidMount() {
        if (this.props.id === undefined) {
            this.generatePalette();
        } else {
            const id = this.props.id.split('/')[3]
            this.state.id = parseInt(id);
            const palette = await fetchPalette(id);
            palette[0].name === undefined ? 
            this.props.history.replace('/404')
            : this.getSpecifiedPalette(palette[0]);
            
        }
    }
    
    getSpecifiedPalette = (palette) => {
        this.state.specified = true;
        Object.keys(palette).forEach(key => {
            if (key.length === 7 || key === ('name' || 'id')) {
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
            if (key[0] === 'c' && this.state[key].split('-')[0] !== 'locked') {
                this.setState({ [key]: palette[index] })
            }
        })

        this.props.setGeneratedColors(palette)
    }

    handleOnChange = e => {
        this.setState({name: e.target.value});
        
    }

    lockColor = (e, num) => {
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

    changeState = () => {
        this.setState({ input: !this.state.input });
    }

    updatePalette = (e, id) => {
        let update = { name: this.state.name }
        if (e.keyCode === 13) {
          fetchPatchPalette(id, update);
          this.changeState();
        }
      }

    render() {
        const { color_1, color_2, color_3, color_4, color_5, id, name, specified, input} = this.state;
        return (
            <article className={`${this.props.select}-container container`}>
                <section className="color color-1" style={{background: color_1}}>
                    <button 
                        className={`freeze-color`}

                        style={{background: color_1}}
                        onClick={(e, num) => this.lockColor(e, 1)}>
                        <img className="lock" src={lock} />
                    </button>
                </section>
                <section className="color color-2" style={{background: color_2}}>
                    <button 
                        className="freeze-color" 
                        style={{background: color_2}}
                        onClick={(e, num) => this.lockColor(e, 2)}>
                        <img className="lock" src={lock} />
                    </button>
                </section>
                <section className="color color-3" style={{background: color_3}}>
                    <button 
                        className="freeze-color" 
                        style={{background: color_3}}
                        onClick={(e, num) => this.lockColor(e, 3)}>
                        <img className="lock" src={lock} />
                    </button>
                </section>
                <section className="color color-4" style={{background: color_4}}>
                    <button 
                        className="freeze-color" 
                        style={{background: color_4}}
                        onClick={(e, num) => this.lockColor(e, 4)}>
                        <img className="lock" src={lock} />
                    </button>
                </section>
                <section className="color color-5" style={{background: color_5}}>
                    <button 
                        className="freeze-color" 
                        style={{background: color_5}}
                        onClick={(e, num) => this.lockColor(e, 5)}>
                        <img className="lock" src={lock} />
                    </button>
                </section>
                {!specified && <ProjectForm />}
                {specified && <h4 className={`${!input}-pal-name specified-name`} onClick={this.changeState}>{name}</h4>}
                {specified && <input 
                    className={`${input}-pal-input`}
                    type="text"
                    onChange={this.handleOnChange}
                    onKeyUp={(e, id) => this.updatePalette(e, this.state.id)}
                    placeholder={name}
                />}
                <button className="generate-btn"
                    onClick={this.generatePalette}>
                    <img className="generate-icon" src={generate} />
                </button>
            </article>
        )
    }
}

export const mapStateToProps = state => ({
    select: state.select
});

export const mapDispatchToProps = (dispatch) => ({
    setGeneratedColors: colors => dispatch(setGeneratedColors(colors))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaletteGenerator);