import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {

    return (
        <header className="nav-bar">
            <NavLink className="link" exact to="/">
                <h1>Palette Picker</h1>
            </NavLink>
            <NavLink className="link" exact to="/">
                <h2>GENERATE NEW PALETTES</h2>
            </NavLink>
            <NavLink className="link" exact to="/projects">
                <h2>PROJECTS</h2>
            </NavLink>
        </header>
    )
}

export default Nav;