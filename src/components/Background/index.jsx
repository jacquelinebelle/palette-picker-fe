import React from 'react';
import './Background.scss';

const Background = ({ color_1, color_2, color_3, color_4, color_5 }) => {

    return (
        <section className="background">
            <div className="second-background"></div>
            <div className="background-container">
                <div 
                    className="ellipse" 
                    style={{background: color_4}} />
                <svg 
                    className="triangle"
                    style={{fill: color_2}}>
                    <polygon points="250,60 100,400 400,400" />
                </svg>
                <svg 
                    className="hexagon"
                    style={{fill: color_3}} >
                    <polygon points="125,37.5 179,68.75 179,131.25 125,162.5 71,131.3 71,68.75" />
                </svg>
                <div 
                    className="square square-1"
                    style={{background: color_1}} />
                <div 
                    className="square square-2"
                    style={{background: color_5}} />
            </div>
        </section>
    )
}

export default Background;
