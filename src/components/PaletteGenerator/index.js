import React, { Component } from 'react';
import './PaletteGenerator.scss';

class PaletteGenerator extends Component {

    render() {
        return (
            <article className="container">
                <section className="color color-1"/>
                <section className="color color-2"/>
                <section className="color color-3"/>
                <section className="color color-4"/>
                <section className="color color-5"/>
            </article>
        )
    }
}

export default PaletteGenerator;